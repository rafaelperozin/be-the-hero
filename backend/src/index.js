const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
// to the app understand the json on request body
app.use(express.json());
app.use(routes);

// set port on localhost. Access localhost:3333 at browser
app.listen(3333);