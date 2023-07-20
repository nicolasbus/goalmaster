const { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const config = require('../config');
const client = new DynamoDBClient({ region: config.awsRegion });
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken'); 

exports.addGoal = async (req, res) => {
  const { title, description, deadline, priority, completed } = req.body;
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token de autorización válido.' });
  }

  const idToken = authorizationHeader.substring('Bearer '.length);
  const decodedToken = jwt.decode(idToken);
  const userId = decodedToken.sub;

  console.log('userId:', userId);
  console.log('idToken:', idToken);

  const params = {
    TableName: config.dynamoDBTableName,
    Item: {
      id: { S: uuidv4() }, 
      title: { S: title },
      description: { S: description },
      deadline: { S: deadline },
      priority: { S: priority },
      completed: { BOOL: completed },
      userId: { S: userId },
    },
  };

  console.log('Params:', params);

  try {
    await client.send(new PutItemCommand(params));
    console.log('Elemento guardado correctamente');
    res.status(200).json({ message: 'Elemento guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el elemento:', error);
    res.status(500).json({ error: 'Error al guardar el elemento' });
  }
};


exports.getGoals = async (req, res) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token de autorización válido.' });
  }

  const idToken = authorizationHeader.substring('Bearer '.length);
  const decodedToken = jwt.decode(idToken);
  const userId = decodedToken.sub;

  const params = {
    TableName: config.dynamoDBTableName,
    FilterExpression: '#userId = :userId',
    ExpressionAttributeNames: {
      '#userId': 'userId',
    },
    ExpressionAttributeValues: {
      ':userId': { S: userId },
    },
  };
  console.log('Params:', params);

  try {
    const data = await client.send(new ScanCommand(params));
    const goals = data.Items.map((item) => ({
      id: item.id.S,
      title: item.title.S,
      description: item.description.S,
      deadline: item.deadline.S,
      priority: item.priority.S,
      completed: item.completed.BOOL,
    }));
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error al obtener las metas:', error);
    res.status(500).json({ error: 'Error al obtener las metas' });
  }
};

//REVISAR
// exports.deleteGoal = async (req, res) => {
//   const { id } = req.params;

//   const params = {
//     TableName: config.dynamoDBTableName,
//     Key: {
//       id: { S: id },
//     },
//   };

//   try {
//     await client.send(new DeleteItemCommand(params));
//     console.log('Meta eliminada:', id);
//     res.status(200).json({ message: 'Meta eliminada correctamente' });
//   } catch (error) {
//     console.error('Error al eliminar la meta:', error);
//     res.status(500).json({ error: 'Error al eliminar la meta' });
//   }
// };

// exports.markGoalAsCompleted = async (req, res) => {
//   const { id } = req.params;
//   const { completed } = req.body;

//   const params = {
//     TableName: config.dynamoDBTableName,
//     Key: {
//       id: { S: id },
//     },
//     UpdateExpression: 'SET completed = :completed',
//     ExpressionAttributeValues: {
//       ':completed': { BOOL: completed },
//     },
//   };

//   try {
//     await client.send(new UpdateItemCommand(params));
//     console.log('Meta marcada como completada:', id);
//     res.status(200).json({ message: 'Meta marcada como completada' });
//   } catch (error) {
//     console.error('Error al marcar la meta como completada:', error);
//     res.status(500).json({ error: 'Error al marcar la meta como completada' });
//   }
// };

// exports.editGoal = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, deadline, priority } = req.body;

//   const params = {
//     TableName: config.dynamoDBTableName,
//     Key: {
//       id: { S: id },
//     },
//     UpdateExpression: 'SET title = :title, description = :description, deadline = :deadline, priority = :priority',
//     ExpressionAttributeValues: {
//       ':title': { S: title },
//       ':description': { S: description },
//       ':deadline': { S: deadline },
//       ':priority': { S: priority },
//     },
//   };

//   try {
//     await client.send(new UpdateItemCommand(params));
//     console.log('Meta actualizada correctamente');
//     res.status(200).json({ message: 'Meta actualizada correctamente' });
//   } catch (error) {
//     console.error('Error al actualizar la meta:', error);
//     res.status(500).json({ error: 'Error al actualizar la meta' });
//   }
// };