const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const mongoURL = process.env['mongoConnectionString'];

const app = express();

mongoClient.connect(mongoURL, { useUnifiedTopology: true })
          .then(client => {console.log('Connected to Database')})
          .catch(error => console.error(error));

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
})

const port = 3000 || process.env.port;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});