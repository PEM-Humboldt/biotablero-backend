import Bottlejs from 'bottlejs';

import Logger from './logger';
import ErrorHandler from './error_handler';

import ByTopicRoutes from '../routes/by_topic';

const bottle = new Bottlejs();

bottle.factory('logger', () => Logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));

bottle.factory('routes', (container) => [ByTopicRoutes(container.errorHandler)]);

export default bottle.container;
