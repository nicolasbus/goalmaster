const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const todoController = require('../controllers/todoController');

//GOALS
router.post('/goals', goalController.addGoal);

router.get('/goals', goalController.getGoals);

router.delete('/goals/:id', goalController.deleteGoal);

router.put('/goals/:id/completed', goalController.markGoalAsCompleted);

router.put('/goals/:id', goalController.editGoal);

//TO DO LIST
router.post('/todolist', todoController.addToDo);

router.get('/todolist', todoController.getToDo);

router.delete('/todolist/:id', todoController.deleteToDo);

router.put('/todolist/:id/completed', todoController.markToDoAsCompleted);


module.exports = router;


