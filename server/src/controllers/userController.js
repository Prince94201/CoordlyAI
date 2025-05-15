const db = require('../config/database');
const { hashPassword, comparePassword, generateToken } = require('../services/authService');

async function signup(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required.' });
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return next(err);
    if (user) return res.status(409).json({ error: 'Username already exists.' });
    const hashed = hashPassword(password);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], function(err) {
      if (err) return next(err);
      res.json({ message: 'Signup successful.' });
    });
  });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required.' });
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return next(err);
    if (!user || !comparePassword(password, user.password)) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = generateToken(user);
    res.json({ token });
  });
}

function saveChatHistory(userId, question, response) {
  db.run('INSERT INTO chat_history (user_id, question, response) VALUES (?, ?, ?)', [userId, question, response], (err) => {
    if (err) console.error('Failed to save chat history:', err);
  });
}

function getChatHistory(req, res, next) {
  const userId = req.user.id;
  db.all('SELECT * FROM chat_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50', [userId], (err, rows) => {
    if (err) return next(err);
    res.json({ history: rows });
  });
}

module.exports = { signup, login, saveChatHistory, getChatHistory };