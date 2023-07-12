const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const config = require('../config');

const client = new DynamoDBClient({ region: config.awsRegion });

exports.addGoal = async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  const params = {
    TableName: config.dynamoDBTableName,
    Item: {
      id: { S: title },
      title: { S: title },
      description: { S: description },
      deadline: { S: deadline },
      priority: { S: priority },
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