const db = require('../config/database');

function getDatabaseSchema(callback) {
  db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`, (err, tables) => {
    if (err) return callback(err);
    const schema = {};
    let pending = tables.length;
    if (pending === 0) return callback(null, schema);
    tables.forEach(table => {
      db.all(`PRAGMA table_info(${table.name});`, (err, columns) => {
        if (err) return callback(err);
        schema[table.name] = columns.map(col => ({
          name: col.name,
          type: col.type
        }));
        if (--pending === 0) callback(null, schema);
      });
    });
  });
}

module.exports = { getDatabaseSchema };