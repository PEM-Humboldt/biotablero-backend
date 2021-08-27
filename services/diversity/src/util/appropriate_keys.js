module.exports = {
  rasterNOSKeys: (val) => {
    switch (val) {
      case 'total':
        return 'total_inf.tif';
      case 'endemic':
        return 'end_inf.tif';
      case 'invasive':
        return 'inv_inf.tif';
      case 'threatened':
        return 'thr_inf.tif';
      default:
        return val;
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

  observedGroupKey: (val) => {
    switch (val) {
      case 'total':
        return 'total_obs';
      case 'endemic':
        return 'end_obs';
      case 'invasive':
        return 'inv_obs';
      case 'threatened':
        return 'thr_obs';
      default:
        return null;
    }
  },

  inferredGroupKey: (val) => {
    switch (val) {
      case 'total':
        return 'total_inf';
      case 'endemic':
        return 'end_inf';
      case 'invasive':
        return 'inv_inf';
      case 'threatened':
        return 'thr_inf';
      default:
        return null;
    }
  },
};
