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
};
