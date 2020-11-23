const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('config');

// Models
const colombiaDetails = require('./colombia_details');
const colombiaCoverageDetails = require('./colombia_coverage_details');
const geoBiomes = require('./geo_biomes');
const geoCompanyProjects = require('./geo_company_projects');
const geoEaBiomes = require('./geo_ea_biomes');
const selectedStrategies = require('./selected_strategies');
const geoEnvironmentalAuthorities = require('./geo_environmental_authorities');
const projectImpactedBiomes = require('./project_impacted_biomes');
const geoCompensationStrategies2018 = require('./geo_compensation_strategies_2018');
const strategies = require('./strategies');
const eaBioticUnits = require('./ea_biotic_units');
const geoStates = require('./geo_states');
const geoMunicipalities = require('./geo_municipalities');
const geoBasinAreas = require('./geo_basin_areas');
const geoBasinZones = require('./geo_basin_zones');
const geoBasinSubzones = require('./geo_basin_subzones');
const geoParamo = require('./geo_paramo');
const geoTropicalDryForest = require('./geo_tropical_dry_forest');
const geoWetland = require('./geo_wetlands');
const geoParamoDetails = require('./geo_paramo_details');
const geoTropicalDryForestDetails = require('./geo_tropical_dry_forest_details');
const colombiaWetlandDetails = require('./colombia_wetland_details');
const globalBinaryProtectedAreas = require('./global_binary_protected_areas');
const geoHF = require('./geo_hf');
const geoHFParamo = require('./geo_hf_paramo');
const geoHFWetland = require('./geo_hf_wetland');
const geoHFTropicalDryForest = require('./geo_hf_tropical_dry_forest');
const geoHFPersistence = require('./geo_hf_persistence');

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
    geoEnvironmentalAuthorities: geoEnvironmentalAuthorities(dbConn, eventHandlers),
    projectImpactedBiomes: projectImpactedBiomes(dbConn, eventHandlers),
    geoCompensationStrategies2018: geoCompensationStrategies2018(dbConn, eventHandlers),
    strategies: strategies(dbConn, eventHandlers),
    colombiaDetails: colombiaDetails(dbConn),
    eaBioticUnits: eaBioticUnits(dbConn),
    geoStates: geoStates(dbConn),
    geoMunicipalities: geoMunicipalities(dbConn),
    geoBasinAreas: geoBasinAreas(dbConn),
    geoBasinZones: geoBasinZones(dbConn),
    geoBasinSubzones: geoBasinSubzones(dbConn),
    geoParamo: geoParamo(dbConn),
    geoTropicalDryForest: geoTropicalDryForest(dbConn),
    geoWetland: geoWetland(dbConn),
    geoParamoDetails: geoParamoDetails(dbConn),
    geoTropicalDryForestDetails: geoTropicalDryForestDetails(dbConn),
    colombiaWetlandDetails: colombiaWetlandDetails(dbConn),
    colombiaCoverageDetails: colombiaCoverageDetails(dbConn),
    globalBinaryProtectedAreas: globalBinaryProtectedAreas(dbConn),
    geoHF: geoHF(dbConn),
    geoHFParamo: geoHFParamo(dbConn),
    geoHFWetland: geoHFWetland(dbConn),
    geoHFTropicalDryForest: geoHFTropicalDryForest(dbConn),
    geoHFPersistence: geoHFPersistence(dbConn),
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
