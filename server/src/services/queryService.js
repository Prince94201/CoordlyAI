const db = require('../config/database');
const { promisify } = require('util');

const executeSQL = async (sql) => {
  console.log('Executing SQL:', sql);
  const allAsync = promisify(db.all).bind(db);
  console.log('SQL executed',allAsync);
  return allAsync(sql, []);
};

module.exports = { executeSQL };