const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');


server.use(jsonServer.defaults());

server.use(router);

server.listen(3000);