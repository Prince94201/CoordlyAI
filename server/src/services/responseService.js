function formatResponse(data, insights, viz, additional) {
  return {
    data,
    insights,
    visualization: viz,
    additional_questions: additional
  };
}

module.exports = { formatResponse };