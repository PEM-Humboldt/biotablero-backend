const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const diContainer = require('./di');

const server = restify.createServer();

process.env.NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV || 'develop';

const cors = corsMiddleware({
  origins: ['*'], // TODO: Change this for a config variable
});
server.pre(cors.preflight);
server.use(cors.actual);

diContainer.routes.forEach(router => router.applyRoutes(server));

server.listen(4000, () => {
  console.log('%s listening at %s', server.name, server.url); // TODO: change console.log for a real logger
});
