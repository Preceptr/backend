const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const ApiRouter = require('../api/apiRoutes');

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'ITS WORKING!!!' });
  return
});

server.use('/api', ApiRouter);

server.use((err, req, res, next) => {
  console.log(err)
  res.json({ message: err.message }).status(err.httpStatusCode || 500)
})

module.exports = server;
