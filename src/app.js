process.env.NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV || 'develop';

const config = require('config');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const diContainer = require('./util/dependency_injection_container');

const server = restify.createServer({
  name: 'biotablero-backend',
  version: '0.1.0',
});
const serverConfig = config.server;

const cors = corsMiddleware({
  origins: serverConfig.origins,
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser({ mapParams: true }));

diContainer.routes.forEach(router => router.applyRoutes(server));

server.listen(serverConfig.port, () => {
  diContainer.logger.info(`${server.name} listening at ${server.url}`);
});
