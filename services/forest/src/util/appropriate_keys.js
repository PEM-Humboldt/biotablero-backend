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
  rasterForestLPSEKeys: (category, period) => {
    switch (true) {
      case category === 'persistencia' && period === '2000-2005':
        return 'persistence_2000-2005.tif';
      case category === 'persistencia' && period === '2006-2010':
        return 'persistence_2006-2010.tif';
      case category === 'persistencia' && period === '2011-2015':
        return 'persistence_2010-2015.tif';
      case category === 'persistencia' && period === '2016-2021':
        return 'persistence_2016-2021.tif';
      case category === 'perdida' && period === '2000-2005':
        return 'loss_2000-2005.tif';
      case category === 'perdida' && period === '2006-2010':
        return 'loss_2006-2010.tif';
      case category === 'perdida' && period === '2011-2015':
        return 'loss_2010-2015.tif';
      case category === 'perdida' && period === '2016-2021':
        return 'loss_2016-2021.tif';
      case category === 'no_bosque' && period === '2000-2005':
        return 'no_forest_2000-2005.tif';
      case category === 'no_bosque' && period === '2006-2010':
        return 'no_forest_2006-2010.tif';
      case category === 'no_bosque' && period === '2011-2015':
        return 'no_forest_2011-2015.tif';
      case category === 'no_bosque' && period === '2016-2021':
        return 'no_forest_2016-2021.tif';  
      default:
        return '';
    }
  },
};
