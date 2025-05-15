const db = require('../config/database');
const { createTables } = require('./schema');
const { insertSampleData } = require('./sampleData');

async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';", async (err, tables) => {
      if (err) {
        console.error('Error checking tables:', err);
        return reject(err);
      }
      if (tables && tables.length > 0) {
        // Check if at least one table has data
        const tableNames = tables.map(t => t.name);
        let checked = 0;
        let hasData = false;
        for (const table of tableNames) {
          db.get(`SELECT 1 FROM ${table} LIMIT 1;`, (err, row) => {
            checked++;
            if (row) hasData = true;
            if (checked === tableNames.length) {
              if (hasData) {
                console.log('Database already initialized. Skipping schema and sample data.');
                return resolve();
              } else {
                // No data, proceed to initialize
                db.exec(createTables, async (err) => {
                  if (err) {
                    console.error('Error creating tables:', err);
                    return reject(err);
                  }
                  try {
                    await insertSampleData(db);
                    resolve();
                  } catch (e) {
                    reject(e);
                  }
                });
              }
            }
          });
        }
      } else {
        // No tables, create and insert
        db.exec(createTables, async (err) => {
          if (err) {
            console.error('Error creating tables:', err);
            return reject(err);
          }
          try {
            await insertSampleData(db);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  });
}

module.exports = initializeDatabase;