module.exports = {
  rasterNOSKeys: (val) => {
    switch (val) {
      case 'total': return 'total_inf.tif';
      case 'endemic': return 'end_inf.tif';
      case 'invasive': return 'inv_inf.tif';
      case 'threatened': return 'thr_inf.tif';
      default: return val;
    }
  },

  areaTypeKeys: (val) => {
    switch (val) {
      case 'basinZones': return 'basin_zones';
      case 'ea': return 'environmental_authorities';
      case 'basinSubzones': return 'basin_subzones';
      default: return val;
    }
  },

};
