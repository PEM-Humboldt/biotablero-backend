const pino = require('pino');

module.exports = () => (
  pino({ base: null, timestamp: () => `,"time": ${new Date(Date.now()).toUTCString()}` })
);
