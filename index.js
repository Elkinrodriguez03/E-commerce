const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server in express');
});

app.get('/new-route', (req, res) => {
  res.send('New Route');
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi port' + port);
})
