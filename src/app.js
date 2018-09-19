const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const diContainer = require('./di');

const server = restify.createServer();


const cors = corsMiddleware({
  origins: ['*'], // TODO: Change this for a config variable
});
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/geofences/ea/:ea_name', (req, res, next) => {
  diContainer.biomePersistence.getBiomeByEA(req.params.ea_name).then((r) => {
    res.send(r);
    next();
  });
});

server.listen(4000, () => {
  console.log('%s listening at %s', server.name, server.url); // TODO: change console.log for a real logger
});
