const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

const whiteList = ['http://127.0.0.1:3000', "https://e-commerce-git-main-elkinrodriguez03.vercel.app", "https://e-commerce-phi-seven.vercel.app/"];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}

app.get('/api', (req, res) => {
  res.send('Server in express');
});

app.get('/api/new-route', (req, res) => {
  res.send('New Route');
});

routerApi(app);
app.use(cors(options));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port' + port);
})
