const config = require('config');
const fs = require('fs');
const path = require('path');

const appPath = path.dirname(require.main.filename); // app.js dir
const logsConfig = config.logs;

const logsDir = `${appPath}/../${logsConfig.dir}`;

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const winston = require('winston');

const logger = winston.createLogger({
 format: winston.format.combine(
   winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A ZZ' }),
   winston.format.json(),
 ),
 transports: [
   new winston.transports.Console({ timestamp: true }),
   new winston.transports.File({
     level: 'error',
     timestamp: true,
     filename: `${logsDir}/error.log`,
   }),
   new winston.transports.File({
     level: 'info',
     timestamp: true,
     filename: `${logsDir}/info.log`,
   }),
 ],
});

module.exports = logger;
