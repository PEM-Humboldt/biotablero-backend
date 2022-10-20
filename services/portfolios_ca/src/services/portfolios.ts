import { readFile } from 'fs/promises';
import path from 'path';
import { URL } from 'url';

export default () => {
  const Portfolios = {
    /**
     * List all the available portfolios in the system
     *
     * @returns {Promise<object[]>} Array of portfolios
     */
    getPortfoliosList: async () => [
      {
        id: 1,
        name: 'WCMC',
      },
      {
        id: 2,
        name: 'ELSA',
      },
      {
        id: 3,
        name: 'WEPLAN',
      },
      {
        id: 4,
        name: 'Especies, Carbono y Agua',
      },
      {
        id: 5,
        name: 'ACC',
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
  return Portfolios;
};
