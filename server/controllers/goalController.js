const { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const config = require('../config');
const client = new DynamoDBClient({ region: config.awsRegion });

exports.addGoal = async (req, res) => {
  const { title, description, deadline, priority, completed } = req.body;

  const params = {
    TableName: config.dynamoDBTableName,
    Item: {
      id: { S: title },
      title: { S: title },
      description: { S: description },
      deadline: { S: deadline },
      priority: { S: priority },
      completed: { BOOL: completed },
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

exports.getGoals = async (req, res) => {
  const params = {
    TableName: config.dynamoDBTableName,
  };

  try {
    const response = await client.send(new ScanCommand(params));
    const goals = response.Items.map((item) => {
      return {
        id: item.id && item.id.S ? item.id.S : '',
        title: item.title && item.title.S ? item.title.S : '',
        description: item.description && item.description.S ? item.description.S : '',
        deadline: item.deadline && item.deadline.S ? item.deadline.S : '',
        priority: item.priority && item.priority.S ? item.priority.S : '',
      };
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error('Error al obtener las metas:', error);
    res.status(500).json({ error: 'Error al obtener las metas' });
  }
};

exports.deleteGoal = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: config.dynamoDBTableName,
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

exports.markGoalAsCompleted = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const params = {
    TableName: config.dynamoDBTableName,
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

exports.editGoal = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, priority } = req.body;

  const params = {
    TableName: config.dynamoDBTableName,
    Key: {
      id: { S: id },
    },
    UpdateExpression: 'SET title = :title, description = :description, deadline = :deadline, priority = :priority',
    ExpressionAttributeValues: {
      ':title': { S: title },
      ':description': { S: description },
      ':deadline': { S: deadline },
      ':priority': { S: priority },
    },
  };

  try {
    await client.send(new UpdateItemCommand(params));
    console.log('Meta actualizada correctamente');
    res.status(200).json({ message: 'Meta actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la meta:', error);
    res.status(500).json({ error: 'Error al actualizar la meta' });
  }
};