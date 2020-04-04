const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const ApiRouter = require('../api/apiRoutes');

server.use(express.json());
server.use(cookieParser())
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
  let errorObj = { message: err.message }
  if(err.details){
    errorObj = {...errorObj, ...err.details}
  }
  res.json(errorObj).status(err.httpStatusCode || 500)
})

module.exports = server;
