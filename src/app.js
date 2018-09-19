const restify = require('restify');

const diContainer = require('./di');

const server = restify.createServer();

server.get('/geofences/ea/:ea_name', (req, res, next) => {
  diContainer.biomePersistence.getBiomeByEA('CORPOBOYACA').then((r) => {
    res.send(r);
    next();
  });
});

server.listen(4000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
