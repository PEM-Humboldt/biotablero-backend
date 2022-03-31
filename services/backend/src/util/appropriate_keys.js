module.exports = {
  persistenceKeysOrder: (val) => {
    switch (val) {
      case 'estable_natural':
        return 1;
      case 'dinamica':
        return 2;
      case 'estable_alta':
        return 3;
      default:
        return val;
    }
  },
  HFCategoriesKeysOrder: (val) => {
    switch (val) {
      case 'natural':
        return 1;
      case 'baja':
        return 2;
      case 'media':
        return 3;
      case 'alta':
        return 4;
      default:
        return val;
    }
  },
  SEKeys: (val) => {
    switch (val) {
      case 'Páramo':
        return 'paramo';
      case 'Humedal':
        return 'wetland';
      case 'Bosque Seco Tropical':
        return 'dryForest';
      default:
        return val;
    }
  },
  HFCategoriesRangeKeys: (val) => {
    switch (true) {
      case val >= 0 && val <= 15:
        return 'natural';
      case val > 15 && val <= 30:
        return 'baja';
      case val > 30 && val <= 60:
        return 'media';
      case val > 60 && val <= 100:
        return 'alta';
      default:
        return val;
    }
  },
  globalPAAreaTypes: (val) => {
    switch (val) {
      case 'ea':
        return 'id_ea';
      case 'basinSubzones':
        return 'id_subzone';
      case 'states':
        return 'id_state';
      default:
        return null;
    }
  },
  globalPASEKeys: (val) => {
    switch (val) {
      case 'Páramo':
        return 'paramo';
      case 'Humedal':
        return 'wetlands';
      case 'Bosque Seco Tropical':
        return 'tropical_dry_forest';
      default:
        return null;
    }
  },
};
