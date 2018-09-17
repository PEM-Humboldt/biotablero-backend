const restify = require('restify');

const server = restify.createServer();

server.get('/hello/:name', (req, res, next) => {
  res.send(`hello ${req.params.name}`);
  next();
});

server.listen(4000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
