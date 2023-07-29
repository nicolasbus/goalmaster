const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const todoController = require('../controllers/todoController');
const notebookController = require('../controllers/notebookController');

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

//NOTEBOOK
router.post('/notebook', notebookController.addNotebook);

router.get('/notebook', notebookController.getNotebook);

router.delete('/notebook/:id', notebookController.deleteNotebook);

router.put('/notebook/:id/completed', notebookController.markNotebookAsCompleted);

module.exports = router;


