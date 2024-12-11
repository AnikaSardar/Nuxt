/**
 * For the following error -
 * Error: listen EADDRINUSE: address already in use :::3333
 * Use this command to kill port : npx kill-port 3333 
*/ 
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Use the json-server router
server.use(router);

// Start the server
server.listen(3333, () => {
  console.log('JSON Server is running at http://localhost:3333');
});
