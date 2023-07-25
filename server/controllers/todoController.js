const { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const config = require('../config');
const client = new DynamoDBClient({ region: config.awsRegion });
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken'); 


exports.addToDo = async (req, res) => {
    const { description, completed } = req.body;
  
    const authorizationHeader = req.header('Authorization');
  
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No se proporcionó un token de autorización válido.' });
    }
  
    const idToken = authorizationHeader.substring('Bearer '.length);
    const decodedToken = jwt.decode(idToken);
    const userId = decodedToken.sub;
    const params = {
      TableName: config.dynamoDBTableName2,
      Item: {
        id: { S: uuidv4() },
        description: { S: description },
        completed: { BOOL: completed },
        userId: { S: userId },
  
      },
    };
  
    try {
      await client.send(new PutItemCommand(params));
      console.log('Elemento guardado correctamente');
      res.status(200).json({ message: 'Elemento guardado correctamente' });
    } catch (error) {
      console.error('Error al guardar el elemento:', error);
      res.status(500).json({ error: 'Error al guardar el elemento' });
    }
  };
  
  
  exports.getToDo = async (req, res) => {
    const authorizationHeader = req.header('Authorization');
  
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No se proporcionó un token de autorización válido.' });
    }
  
    const idToken = authorizationHeader.substring('Bearer '.length);
    const decodedToken = jwt.decode(idToken);
    const userId = decodedToken.sub;
  
    const params = {
      TableName: config.dynamoDBTableName2,
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
        description: item.description.S,
        completed: item.completed.BOOL,
      }));
      res.status(200).json(goals);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
      res.status(500).json({ error: 'Error al obtener las metas' });
    }
  };
  
  exports.markToDoAsCompleted = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
  
    const params = {
      TableName: config.dynamoDBTableName2,
      Key: {
        id: { S: id },
      },
      UpdateExpression: 'SET completed = :completed',
      ExpressionAttributeValues: {
        ':completed': { BOOL: completed },
      },
    };
  
    try {
      await client.send(new UpdateItemCommand(params));
      console.log('Meta marcada como completada:', id);
      res.status(200).json({ message: 'Meta marcada como completada' });
    } catch (error) {
      console.error('Error al marcar la meta como completada:', error);
      res.status(500).json({ error: 'Error al marcar la meta como completada' });
    }
  };
  
  exports.deleteToDo = async (req, res) => {
    const { id } = req.params;
  
    const params = {
      TableName: config.dynamoDBTableName2,
      Key: {
        id: { S: id },
      },
    };
  
    try {
      await client.send(new DeleteItemCommand(params));
      console.log('Meta eliminada:', id);
      res.status(200).json({ message: 'Meta eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar la meta:', error);
      res.status(500).json({ error: 'Error al eliminar la meta' });
    }
  };