const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.post('/goals', goalController.addGoal);

module.exports = router;