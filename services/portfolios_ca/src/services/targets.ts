import { readFile } from 'fs/promises';
import path from 'path';
import { URL } from 'url';

export default () => {
  const Targets = {
    /**
     * Get target basic information and values of all portfolios for a specific target within a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId argetPortfoliosLayerea id
     * @param {Number} targetId target id
     *
     * @returns {Object} Target basic information and values of portfolios
     */
    getPortfoliosByTarget: async (targetId: number) => {
      const portfolio = (await Targets.getTargetsList()).filter(
        (element) => element.id === Number(targetId),
      );
      const data = [
        {
          target_id: portfolio[0].id,
          target_name: `${portfolio[0].name}`,
          target_national: 4521,
          target_units_short: 'TC',
          target_units: 'Toneladas de carbono',
          portfolios_data: [
            {
              id: 1,
              name: 'NATURE MAP · WCMC',
              short_name: 'WCMC',
              value: 100,
            },
            {
              id: 2,
              name: 'ELSA · PNUD',
              short_name: 'ELSA',
              value: 200,
            },
            {
              id: 3,
              name: 'WEPLAN FORESTS',
              short_name: 'WEPLAN',
              value: 300,
            },
            {
              id: 4,
              name: 'Especies, Carbono y Agua . LONG NAME',
              short_name: 'Especies, Carbono y Agua',
              value: 400,
            },
            {
              id: 5,
              name: 'ACC · LONG NAME',
              short_name: 'ACC',
              value: 500,
            },
          ],
        },
        {
          target_id: portfolio[0].id,
          target_name: `${portfolio[0].name}`,
          target_national: 4521,
          target_units_short: 'TC',
          target_units: 'Toneladas de carbono',
          portfolios_data: [
            {
              id: 1,
              name: 'NATURE MAP · WCMC',
              short_name: 'WCMC',
              value: 420,
            },
            {
              id: 2,
              name: 'ELSA · PNUD',
              short_name: 'ELSA',
              value: 250,
            },
            {
              id: 3,
              name: 'WEPLAN FORESTS',
              short_name: 'WEPLAN',
              value: 330,
            },
            {
              id: 4,
              name: 'Especies, Carbono y Agua . LONG NAME',
              short_name: 'Especies, Carbono y Agua',
              value: 0,
            },
            {
              id: 5,
              name: 'ACC · LONG NAME',
              short_name: 'ACC',
              value: 80,
            },
          ],
        },
      ];
      const elementId = targetId % 2 === 0 ? 0 : 1;

      return data[elementId];
    },

    /**
     * Get list of targets with portfolios values within a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Promise<object[]>} List of targets with portfolios values
     */
    getTargetsList: async () => [
      {
        id: 1,
        name: 'Especies',
      },
      {
        id: 2,
        name: 'Ecosistemas',
      },
      {
        id: 3,
        name: 'Servicios Ecosistémicos',
      },
      {
        id: 4,
        name: 'Conectividad',
      },
      {
        id: 5,
        name: 'Cambio Climático',
      },
      {
        id: 6,
        name: 'Deforestación',
      },
      {
        id: 7,
        name: 'Restauración',
      },
      {
        id: 8,
        name: 'Aguas - Rios',
      },
    ],

    /**
     * Get a raster layer by portfolio in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {Number} portfolioId portfolio id
     *
     * @returns {Binary} result image with the portfolio cropped by search area
     */
    getPortfoliosCALayer: async (portfolioId: number) => {
      const currentFileUrl = new URL(import.meta.url);
      const folder = path.join(path.dirname(currentFileUrl.pathname), '../tmp');
      if (portfolioId === 1) {
        return readFile(`${folder}/portafolios-ca_layer_1_1.png`);
      }
      if (portfolioId === 2) {
        return readFile(`${folder}/portafolios-ca_layer_1_3.png`);
      }
      if (portfolioId === 3) {
        return readFile(`${folder}/portafolios-ca_layer_5_1.png`);
      }
      if (portfolioId === 4) {
        return readFile(`${folder}/portafolios-ca_layer_5_3.png`);
      }
      return readFile(`${folder}/portafolios-ca_layer_1_1.png`);
    },
  };
  return Targets;
};
