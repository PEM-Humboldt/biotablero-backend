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
          name: 'Biodiversidad, Servicios Ecosistémicos y Riesgos - NatureMap',
          short_name: 'Biod · SS.EE. · Riesgo',
          value: Math.random() * 3000,
        },
        {
          id: 2,
          name: 'Áreas esenciales de soporte para la vida',
          short_name: 'ELSA',
          value: Math.random() * 3000,
        },
        {
          id: 3,
          name: 'Restauración - WePlan Forests, Colombia',
          short_name: 'Rest · WePlan',
          value: Math.random() * 3000,
        },
        {
          id: 4,
          name: 'Biodiversidad, Carbono y agua - NatureMap',
          short_name: 'Biod · Carbono · Agua',
          value: Math.random() * 3000,
        },
        {
          id: 5,
          name: 'Áreas claves de conservación de la biodiversidad acuática',
          short_name: 'ACC · Biod. Acuática',
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
        target_text_key: `${target.textKey}`,
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
          name: 'Ecosistemas',
          textKey: 'targetEcosystems',
        },
        {
          id: 2,
          name: 'Conectividad',
          textKey: 'targetConectivity',
        },
        {
          id: 3,
          name: 'Almacenamiento de agua',
          textKey: 'targetWaterStorage',
        },
        {
          id: 4,
          name: 'Almacenamiento de carbono',
          textKey: 'targetCarbonStorage',
        },
        {
          id: 5,
          name: 'Deforestación evitada',
          textKey: 'targetAvoidedDeforestation',
        },
        {
          id: 6,
          name: 'Restauración',
          textKey: 'targetRestoration',
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
