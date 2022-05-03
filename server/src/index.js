const express = require('express');

const app = express();
const port = 420;

app.get('/', (req, res) => {
  console.log('Received get request!');
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});