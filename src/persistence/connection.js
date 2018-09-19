const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('config');

const dbConfig = config.get('db');
let conn = null;

const connect = () => {
  if (conn !== null) return conn;
  const knexClient = knex({ //Change these values for config variables
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

module.exports = connect();
