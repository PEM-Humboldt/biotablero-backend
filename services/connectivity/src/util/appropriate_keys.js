module.exports = {
  areaTypeKeys: (val) => {
    switch (val) {
      case 'ea':
        return 'environmental_authorities';
      case 'states':
        return 'states';
      case 'basinSubzones':
        return 'basin_subzones';
      default:
        return val;
    }
  },
  paConnCategoriesKeys: (val) => {
    switch (val) {
      case 'unprotected':
        return 'unprot';
      case 'protconn':
        return 'prot_conn';
      case 'protunconn':
        return 'prot_unconn';
      default:
        return val;
    }
  },
  areaTypeDBKeys: (val) => {
    switch (val) {
      case 'ea':
        return 'id_ea';
      case 'states':
        return 'id_state';
      case 'basinSubzones':
        return 'id_subzone';
      default:
        return val;
    }
  },
  dpcDBKeys: (val) => {
    switch (val) {
      case 'ea':
        return 'dpc_ea';
      case 'states':
        return 'dpc_state';
      case 'basinSubzones':
        return 'dpc_subzone';
      default:
        return val;
    }
  },
  dpcCategoriesDBKeys: (val) => {
    switch (val) {
      case 'ea':
        return 'dpc_cat_ea';
      case 'states':
        return 'dpc_cat_state';
      case 'basinSubzones':
        return 'dpc_cat_subzone';
      default:
        return val;
    }
  },
};
