import { TargetsServiceI, TargetsList, PortfoliosByTarget } from '../types/targets';

export default (): TargetsServiceI => {
  const Targets: TargetsServiceI = {
    /**
     * Get target basic information and values of all portfolios for a specific target within a given area
     *
     * @param areaType - area type
     * @param areaId - area id
     * @param targetId - target id
     *
     * @returns Target basic information and values of portfolios
     */
    getPortfoliosByTarget: async (
      areaType: string,
      areaId: string | number,
      targetId: number,
    ): Promise<PortfoliosByTarget> => {
      const target = (await Targets.getTargetsList(areaType, areaId)).find(
        (element): boolean => element.id === targetId,
      );
      if (!target) {
        const error = {
          code: 404,
          message: 'No portfolios for this area and target',
        };
        throw error;
      }
      const portfoliosOptions = [
        {
          id: 1,
          name: 'NATURE MAP · WCMC',
          short_name: 'WCMC',
          value: Math.random() * 3000,
        },
        {
          id: 2,
          name: 'ELSA · PNUD',
          short_name: 'ELSA',
          value: Math.random() * 3000,
        },
        {
          id: 3,
          name: 'WEPLAN FORESTS',
          short_name: 'WEPLAN',
          value: Math.random() * 3000,
        },
        {
          id: 4,
          name: 'Especies, Carbono y Agua . LONG NAME',
          short_name: 'Especies, Carbono y Agua',
          value: Math.random() * 3000,
        },
        {
          id: 5,
          name: 'ACC · LONG NAME',
          short_name: 'ACC',
          value: Math.random() * 3000,
        },
      ];

      if (areaType === 'ea' && areaId === 'CARDER') {
        portfoliosOptions.splice(2, 1);
      }
      if (areaType === 'ea' && areaId === 'CARDER' && targetId === 3) {
        portfoliosOptions.splice(2, 1);
      }

      const data = {
        target_id: target.id,
        target_name: `${target.name}`,
        target_national: 4521,
        target_units_short: 'TC',
        target_units: 'Toneladas de carbono',
        portfolios_data: portfoliosOptions,
      };

      return data;
    },

    /**
     * Get list of targets with portfolios values within a given area
     *
     * @param areaType - area type
     * @param areaId - area id
     *
     * @returns List of targets with portfolios values
     */
    getTargetsList: async (
      areaType: string,
      areaId: string | number,
    ): Promise<Array<TargetsList>> => {
      const targets = [
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
      ];
      if (areaType === 'ea' && areaId === 'CARDER') {
        return targets.slice(1);
      }
      return targets;
    },
  };
  return Targets;
};
