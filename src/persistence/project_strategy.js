module.exports = (bookshelfConn, { SelectedStrategies }) => ({
  /**
   * Create a new project strategy
   *
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: strategy => SelectedStrategies.forge(strategy).save(),
});
