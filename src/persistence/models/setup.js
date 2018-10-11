const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('config');

// Models
const geoBiomes = require('./geo_biomes');
const geoCompanyProjects = require('./geo_company_projects');
const geoEaBiomes = require('./geo_ea_biomes');
const selectedStrategies = require('./selected_strategies');
const environmentalAuthorities = require('./environmental_authorities');
const hidroAreas = require('./hidro_areas');
const projectImpactedBiomes = require('./project_impacted_biomes');

// Collections
const projectImpactedBiomesCollection = require('./project_impacted_biomes.collection');

const eventHandlers = require('./util/events');

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
    geoBiomes: geoBiomes(dbConn, eventHandlers),
    geoCompanyProjects: geoCompanyProjects(dbConn, eventHandlers),
    geoEaBiomes: geoEaBiomes(dbConn, eventHandlers),
    selectedStrategies: selectedStrategies(dbConn, eventHandlers),
    environmentalAuthorities: environmentalAuthorities(dbConn, eventHandlers),
    hidroAreas: hidroAreas(dbConn, eventHandlers),
    projectImpactedBiomes: projectImpactedBiomes(dbConn, eventHandlers),
  };
  Object.keys(models).forEach((key) => {
    if (models[key].setRelations) models[key].setRelations(models);
  });
  const collections = {
    projectImpactedBiomes: projectImpactedBiomesCollection(dbConn, models.projectImpactedBiomes),
  };
  return {
    db: dbConn.knex,
    models,
    collections,
  };
};

module.exports = setupModels();
