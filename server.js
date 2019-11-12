const express = require('express');
const server = express();

// Global Middleware
server.use(express.json());

// Import Routers
const projectsRouter = require('./projects/projects-router.js');

// Mount Router
server.use('/api/projects', projectsRouter);

module.exports = server;
