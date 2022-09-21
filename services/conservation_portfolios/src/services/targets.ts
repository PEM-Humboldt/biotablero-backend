export default () => {
  const Targets = {
    /**
     * Get values of all portfolios for a specific target within a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {Number} targetId target id
     *
     * @returns {Object[]} Values of all portfolios for a specific target
     */
     getPortfoliosByTarget: async () => ([
      {
        id: 1,
        name: 'NATURE MAP · WCMC',
        shortName: 'WCMC',
        value: 100,
      },
      {
        id: 2,
        name: 'ELSA · PNUD',
        shortName: 'ELSA',
        value: 200,
      },
      {
        id: 3,
        name: 'WEPLAN FORESTS',
        shortName: 'WEPLAN',
        value: 300,
      },
      {
        id: 4,
        name: 'Especies, Carbono y Agua . LONG NAME',
        shortName: 'Especies, Carbono y Agua',
        value: 400,
      },
      {
        id: 5,
        name: 'ACC · LONG NAME',
        shortName: 'ACC',
        value: 500,
      }
     ]),
  };

  return Targets;
};
