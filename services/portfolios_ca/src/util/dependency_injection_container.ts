import Bottlejs from 'bottlejs';

import Logger from './logger';
import ErrorHandler from './error_handler';

import TargetsService from '../services/targets';
import PortfoliosService from '../services/portfolios';

import TargetsRoutes from '../routes/targets';
import PortfoliosRoutes from '../routes/portfolios';

const bottle = new Bottlejs();

bottle.factory('logger', () => Logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));

bottle.factory('TargetsService', () => TargetsService());
bottle.factory('PortfoliosService', () => PortfoliosService());

bottle.factory('routes', (container) => [
  TargetsRoutes(container.TargetsService),
  PortfoliosRoutes(container.PortfoliosService),
]);

export default bottle.container;
