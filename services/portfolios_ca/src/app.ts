import config from 'config';
import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import { Router } from 'restify-router';

import diContainer from './util/dependency_injection_container';

process.env.NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV || 'develop';

const server = restify.createServer({
  name: 'biotablero-conservation-porfolios',
  version: '1.0.0',
});
const serverConfig: { port: number; origins: Array<string> } = config.get('server');
const cors = corsMiddleware({
  origins: serverConfig.origins,
  allowHeaders: [],
  exposeHeaders: [],
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser());

server.on('NotFound', (_req, res, err, cb) => {
  if (err.body.code === 'ResourceNotFound') {
    res.setHeader('Access-Control-Allow-Origin', serverConfig.origins);
  }
  cb();
});

diContainer.routes.forEach((router: Router) => router.applyRoutes(server));

server.listen(serverConfig.port, () => {
  diContainer.logger.info(`${server.name} listening at ${server.url}`);
});
