const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const mongoURL = process.env['mongoConnectionString'];
const port = process.env.port || 3000;

const app = express();

mongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('quotes');
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(express.static('css'));

    app.get('/', (req, res) => {
      const cursor = db.collection('quotes').find().toArray()
      .then(results => {
        console.log(results);
        res.render('index.ejs', {quotes: results});
      })
      .catch(error => console.error(error));
      console.log(cursor);
    });

    app.post('/quotes', (req, res) => {
      console.log(req.body);
      quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result);
        res.redirect('/');
      })
      .catch(error => console.error(error));
    });

  })
  .catch(error => console.error(error));



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});