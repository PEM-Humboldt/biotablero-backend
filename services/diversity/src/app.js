process.env.NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV || 'develop';

const config = require('config');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const diContainer = require('./util/dependency_injection_container');

const server = restify.createServer({
  name: 'biotablero-backend-diversity',
  version: '1.0.0',
});
const serverConfig = config.server;

const cors = corsMiddleware({
  origins: serverConfig.origins,
});
server.pre(cors.preflight);
server.pre((req, _res, next) => {
  diContainer.logger.info(`[${req.id()}] received - ${req.href()}`);
  next();
});
server.use(cors.actual);
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser());

server.on('NotFound', (req, res, err, cb) => {
  if (err.body.code === 'ResourceNotFound') {
    res.setHeader('Access-Control-Allow-Origin', serverConfig.origins);
  }
  cb();
});

server.on('after', (req) => {
  diContainer.logger.info(`[${req.id()}] finished - ${req.href()}`);
});
server.on('restifyError', diContainer.errorHandler);

diContainer.routes.forEach((router) => router.applyRoutes(server));

server.listen(serverConfig.port, () => {
  diContainer.logger.info(`${server.name} listening at ${server.url}`);
});
