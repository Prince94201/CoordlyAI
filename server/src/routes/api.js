const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const userController = require('../controllers/userController');
const { validateQueryInput } = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');

// Auth routes
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Chat history (protected)
router.get('/history', authMiddleware, userController.getChatHistory);

// POST /api/query - Process natural language questions (requires authentication)
router.post('/query', authMiddleware, validateQueryInput, queryController.processQuery);

// GET /api/schema - Retrieve database schema information
router.get('/schema', queryController.getSchema);

// (Optional) GET /api/history - Get query history
// router.get('/history', queryController.getHistory);

module.exports = router;