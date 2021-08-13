const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const mongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const mongoURL = process.env['mongoConnectionString'];

const Character = require('./models/Character.js');

const app = express();

mongoose.connect(mongoURL, mongooseOptions);
const db = mongoose.connection;

db.once('open', _ => {
  console.log(`Database connected: ${mongoURL}`);
})

db.on('error', err => {
  console.error("Connection error: " + err);
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});