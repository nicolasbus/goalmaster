const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const cognitoRouter = require('./routes/cognito'); 
const dynamodbRouter = require('./routes/dynamodb');


app.use(cors());

app.use(bodyParser.json());

app.use('/api', dynamodbRouter);

app.use('/auth', cognitoRouter); 

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});