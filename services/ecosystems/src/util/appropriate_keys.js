module.exports = {
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
};
