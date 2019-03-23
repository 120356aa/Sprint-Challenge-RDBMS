const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const server = express();

const PORT = 5000;

server.use(helmet());
server.use(express.json());

server.listen(PORT, console.log(PORT));