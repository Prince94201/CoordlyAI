const { add } = require('date-fns/add');
const genAI = require('../config/gemini');
const { generatePrompt } = require('../prompt');

async function getSQLFromQuestion(question, schema, promptOverride) {
    try {
        const prompt = promptOverride || generatePrompt(question, schema);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(prompt);
        const content = await result.response.text();
        let parsed;
        try {
            parsed = JSON.parse(content);
        } catch (e) {
            const match = content.match(/\{[\s\S]*\}/);
            if (match) {
                parsed = JSON.parse(match[0]);
            } else {
                throw new Error('Could not parse Gemini response as JSON.');
            }
        }
        if (parsed.isChat){
            return {
                isChat: true,
                additional: parsed.additional_questions,
                nlp_text: parsed.nlp_text
            }
        }else{
            return {
                isChat: false,
                sql: parsed.sql,
                viz: parsed.visualization,
                insights: parsed.insights,
                additional: parsed.additional_questions
            };
        }
        
    } catch (err) {
        console.error('Gemini NLP error:', err);
        return { sql: null, viz: {}, insights: ['Failed to process question.'] };
    }
}

async function getNlpMessageFromData(question, sql, data) {
    try {
        const prompt = `
You are a business intelligence assistant. Given the user's question, the SQL query, and the SQL result data, generate a concise, user-friendly natural language summary or insight for the user. Also include some key statistics or observations from the data.
Make sure to explain any important trends or anomalies in the data.
Do not include any SQL code or technical jargon in your response.
Include advice or recommendations based on the data if applicable.
Also include any relevant ideas for further analysis or questions the user might want to explore.
Dont use any technical jargon or SQL code in your response.
Dont use Markdown or code blocks in your response.

User Question: ${question}
SQL Query: ${sql}
SQL Result Data: ${JSON.stringify(data, null, 2)}

Respond ONLY with the natural language message.`;
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(prompt);
        const content = await result.response.text();
        return content.trim();
    } catch (err) {
        console.error('Gemini NLP summary error:', err);
        return 'Could not generate a summary for the result.';
    }
}

module.exports = { getSQLFromQuestion, getNlpMessageFromData };