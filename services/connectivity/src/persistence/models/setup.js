const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('config');

// Models
const connectivity = require('./connectivity');
const connectivityDpc = require('./connectivity_dpc');
const geoProtectedAreas = require('./geo_protected_areas');
const geoConnParamo = require('./geo_conn_paramo');
const geoConnTropicalDryForest = require('./geo_conn_tropical_dry_forest');
const geoConnWetland = require('./geo_conn_wetland');

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
    connectivity: connectivity(dbConn),
    connectivityDpc: connectivityDpc(dbConn),
    geoProtectedAreas: geoProtectedAreas(dbConn),
    geoConnParamo: geoConnParamo(dbConn),
    geoConnTropicalDryForest: geoConnTropicalDryForest(dbConn),
    geoConnWetland: geoConnWetland(dbConn),
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
