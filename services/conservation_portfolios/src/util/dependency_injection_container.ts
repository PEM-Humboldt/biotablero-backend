import Bottlejs from 'bottlejs';

import logger from './logger';

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);

export default bottle.container;
