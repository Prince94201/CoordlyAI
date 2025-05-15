// Controller for handling BI agent queries and schema
const nlpService = require('../services/nlpService');
const queryService = require('../services/queryService');
const responseService = require('../services/responseService');
const schemaMapper = require('../utils/schemaMapper');
const userController = require('./userController');

// POST /api/query
async function processQuery(req, res, next) {
  try {
    const { question } = req.body;
    console.log('Processing query:', question);

    schemaMapper.getDatabaseSchema(async (err, schema) => {

      if (err) return next(err);
      const { generatePrompt } = require('../prompt');
      const prompt = generatePrompt(question, schema);
      // Call OpenAI to get SQL, viz, insights
      const nlpResult = await nlpService.getSQLFromQuestion(question, schema, prompt);
      if(nlpResult.isChat){
        const chatResponse = {
          isChat: true,
          additional_questions: nlpResult.additional,
          nlp_text: nlpResult.nlp_text
        }
        // Save chat history for the authenticated user
        if (req.user && req.user.id) {
          userController.saveChatHistory(req.user.id, question, JSON.stringify(chatResponse));
        }
        return res.json(chatResponse);
      }else{
        if (!nlpResult.sql) return res.status(400).json({ error: 'Failed to generate SQL from question.' });
      // Execute SQL
      try {
        const data = await queryService.executeSQL(nlpResult.sql);
        // Generate natural language message from SQL result
        const nlpMsg = await nlpService.getNlpMessageFromData(question, nlpResult.sql, data);
        const response = responseService.formatResponse(data, nlpResult.insights, nlpResult.viz,nlpResult.additional);
        response.nlp_text = nlpMsg; // Add the generated NLP message
        // Save chat history for the authenticated user
        if (req.user && req.user.id) {
          userController.saveChatHistory(req.user.id, question, JSON.stringify(response));
        }

        res.json(response);
      } catch (err) {
        console.log('SQL execution error:', err);
        return next(err);
      }
      }
      
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/schema
function getSchema(req, res, next) {
  try {
    schemaMapper.getDatabaseSchema((err, schema) => {
      if (err) return next(err);
      res.json({ schema });
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { processQuery, getSchema };