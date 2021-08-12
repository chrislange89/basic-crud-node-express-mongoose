const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // res.send('Hello Express app!')
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

const port = 3000 || process.env.port;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});