const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('config');

// Models
const texts = require('./texts');
const downloads = require('./downloads');

const dbConfig = config.get('db');
let conn = null;

const connect = () => {
  if (conn !== null) return conn;
  const knexClient = knex({
    client: 'pg',
    connection: {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    },
  });
  conn = bookshelf(knexClient);
  return conn;
};

let models = null;

const setupModels = () => {
  if (models !== null) return models;

  const dbConn = connect();
  models = {
    texts: texts(dbConn),
    downloads: downloads(dbConn),
  };
  Object.keys(models).forEach((key) => {
    if (models[key].setRelations) models[key].setRelations(models);
  });
  return {
    db: dbConn.knex,
    models,
  };
};

module.exports = setupModels();
