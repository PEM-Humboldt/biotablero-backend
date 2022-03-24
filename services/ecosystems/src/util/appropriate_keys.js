module.exports = {
  areaTypeKeys: (val) => {
    switch (val) {
      case 'basinZones':
        return 'basin_zones';
      case 'ea':
        return 'environmental_authorities';
      case 'basinSubzones':
        return 'basin_subzones';
      default:
        return val;
    }
  },
  rasterCoverageKeys: (val) => {
    switch (val) {
      case 'N':
        return 'coverage_2018_N.tif';
      case 'S':
        return 'coverage_2018_S.tif';
      case 'T':
        return 'coverage_2018_T.tif';
      case 'X':
      default:
        return '';
    }
  },
  rasterCoverageSEKeys: (seType, coverageType) => {
    switch (true) {
      case seType === 'Bosque Seco Tropical' && coverageType === 'N':
        return 'coverage_2018_N.tif';
      case seType === 'Bosque Seco Tropical' && coverageType === 'S':
        return 'coverage_2018_S.tif';
      case seType === 'Bosque Seco Tropical' && coverageType === 'T':
        return 'coverage_2018_T.tif';
      case seType === 'Páramo' && coverageType === 'N':
        return 'coverage_2018_N.tif';
      case seType === 'Páramo' && coverageType === 'S':
        return 'coverage_2018_S.tif';
      case seType === 'Páramo' && coverageType === 'T':
        return 'coverage_2018_T.tif';
      case seType === 'Humedal' && coverageType === 'N':
        return 'coverage_2018_N.tif';
      case seType === 'Humedal' && coverageType === 'S':
        return 'coverage_2018_S.tif';
      case seType === 'Humedal' && coverageType === 'T':
        return 'coverage_2018_T.tif';
      case seType === 'Bosque Seco Tropical' && coverageType === 'X':
      case seType === 'Páramo' && coverageType === 'X':
      case seType === 'Humedal' && coverageType === '':
      default:
        return '';
    }
  },
};
