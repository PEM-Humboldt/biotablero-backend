module.exports = biomePersistence => ({
  getBiomeByEA: envAuthority => biomePersistence.findBiomeByEA(envAuthority),
});
