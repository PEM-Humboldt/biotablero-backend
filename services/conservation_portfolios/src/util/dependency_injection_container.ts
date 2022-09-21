import Bottlejs from 'bottlejs';

import Logger from './logger';
import ErrorHandler from './error_handler';

import TargetsService from '../services/targets';

import TargetsRoutes from '../routes/targets';

const bottle = new Bottlejs();

bottle.factory('logger', () => Logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));

bottle.factory('TargetsService', () => TargetsService());

bottle.factory('routes', (container) => [TargetsRoutes(container.errorHandler, container.TargetsService)]);

export default bottle.container;
