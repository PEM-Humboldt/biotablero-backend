const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('config');

// Models
const colombiaDetails = require('./colombia_details');
const geoBiomes = require('./geo_biomes');
const geoCompanyProjects = require('./geo_company_projects');
const geoEaBiomes = require('./geo_ea_biomes');
const selectedStrategies = require('./selected_strategies');
const environmentalAuthorities = require('./environmental_authorities');
const hidroAreas = require('./hidro_areas');
const projectImpactedBiomes = require('./project_impacted_biomes');
const geoCompensationStrategies2018 = require('./geo_compensation_strategies_2018');
const strategies = require('./strategies');
const eaBioticUnits = require('./ea_biotic_units');
const geoStates = require('./geo_states');
const geoMunicipalities = require('./geo_municipalities');
const geoProtectedAreas = require('./geo_protected_areas');

// Collections
const modelCollection = require('./model.collection');

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
    geoEaBiomes: geoEaBiomes(dbConn),
    selectedStrategies: selectedStrategies(dbConn, eventHandlers),
    environmentalAuthorities: environmentalAuthorities(dbConn, eventHandlers),
    hidroAreas: hidroAreas(dbConn, eventHandlers),
    projectImpactedBiomes: projectImpactedBiomes(dbConn, eventHandlers),
    geoCompensationStrategies2018: geoCompensationStrategies2018(dbConn, eventHandlers),
    strategies: strategies(dbConn, eventHandlers),
    colombiaDetails: colombiaDetails(dbConn),
    eaBioticUnits: eaBioticUnits(dbConn),
    geoStates: geoStates(dbConn),
    geoMunicipalities: geoMunicipalities(dbConn),
    geoProtectedAreas: geoProtectedAreas(dbConn),
  };
  Object.keys(models).forEach((key) => {
    if (models[key].setRelations) models[key].setRelations(models);
  });
  const collections = {
    projectImpactedBiomes: modelCollection(dbConn, models.projectImpactedBiomes),
  };
  return {
    db: dbConn.knex,
    models,
    collections,
  };
};

module.exports = setupModels();
