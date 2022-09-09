import fs from 'fs';
import path from 'path';
import { URL } from 'url';

import config from 'config';
import winston from 'winston';

const currentFileUrl = new URL(import.meta.url);
const currentFolder = path.dirname(currentFileUrl.pathname);

const logsConfig: { dir: string } = config.get('logs');

const logsDir = `${currentFolder}/../../${logsConfig.dir}`;

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A ZZ' }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({}),
    new winston.transports.File({
      level: 'error',
      filename: `${logsDir}/error.log`,
    }),
    new winston.transports.File({
      level: 'info',
      filename: `${logsDir}/info.log`,
    }),
  ],
});

export default logger;
