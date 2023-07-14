const express = require('express');
const bodyParser = require('body-parser');
const goalsRouter = require('./routes/goals');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(bodyParser.json());

app.use('/api', goalsRouter);


app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});