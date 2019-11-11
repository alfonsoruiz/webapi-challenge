const express = require('express');
const server = express();

// Glboal Middleware
server.use(express.json());

//Routes
const projectsRouter = require('./projects/projects-router.js');

server.use('/api/projects', projectsRouter);

module.exports = server;
