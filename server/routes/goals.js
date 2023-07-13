const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');


router.post('/goals', goalController.addGoal);

router.get('/goals', goalController.getGoals);

router.delete('/goals/:id', goalController.deleteGoal);

router.put('/goals/:id/completed', goalController.markGoalAsCompleted);



module.exports = router;


