const express = require('express');
const bodyParser = require('body-parser');
const goalsRouter = require('./routes/goals');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', goalsRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});