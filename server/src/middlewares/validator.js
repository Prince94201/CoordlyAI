function validateQueryInput(req, res, next) {
  const { question } = req.body;
  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'A valid natural language question is required.' });
  }
  next();
}

module.exports = { validateQueryInput };