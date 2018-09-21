process.env.NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV || 'develop';

const config = require('config');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const diContainer = require('./di');

const server = restify.createServer();
const serverConfig = config.server;

const cors = corsMiddleware({
  origins: serverConfig.origins,
});
server.pre(cors.preflight);
server.use(cors.actual);

diContainer.routes.forEach(router => router.applyRoutes(server));

server.listen(serverConfig.port, () => {
  diContainer.logger.info('%s listening at %s', server.name, server.url);
});
