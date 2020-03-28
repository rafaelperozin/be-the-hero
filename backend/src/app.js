const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
// to the app understand the json on request body
app.use(express.json());
app.use(routes);
app.use(errors());

// // set port on localhost. Access localhost:3333 at browser
// app.listen(3333);

// exporta o app e roda o listen dentro de server porque o teste nao deve usar a porta 3333
// so ira usar a porta 3333 que esta no server quando rodar o npm start

module.exports = app;