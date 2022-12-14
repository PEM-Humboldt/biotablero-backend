import { readFile } from 'fs/promises';
import path from 'path';
import { URL } from 'url';
import { PortfoliosServiceI, PortfoliosList } from '../types/portfolios';

export default (): PortfoliosServiceI => {
  const Portfolios = {
    /**
     * List all the available portfolios in the system
     *
     * @returns Array of portfolios
     */
    getPortfoliosList: async (): Promise<Array<PortfoliosList>> => [
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
     * @param areaType - area type
     * @param areaId - area id
     * @param portfolioId - portfolio id
     *
     * @returns result image with the portfolio cropped by search area
     */
    getPortfoliosCALayer: async (portfolioId: number): Promise<Buffer> => {
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

      const error = {
        code: 404,
        message: 'No layers for this portfolio',
      };
      throw error;
    },
  };
  return Portfolios;
};
