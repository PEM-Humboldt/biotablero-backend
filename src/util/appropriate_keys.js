module.exports = {
  persistenceKeys: (val) => {
    switch (val) {
      case 'Estables naturales': return { key: 'estable_natural', order: 1 };
      case 'Dinámicas': return { key: 'dinamica', order: 2 };
      case 'Estables altas': return { key: 'estable_alta', order: 3 };
      default: return val;
    }
  },
  HFCategoriesKeys: (val) => {
    switch (val) {
      case 'Natural': return { key: 'natural', order: 1 };
      case 'Baja': return { key: 'baja', order: 2 };
      case 'Media': return { key: 'media', order: 3 };
      case 'Alta': return { key: 'alta', order: 4 };
      default: return val;
    }
  },
  SEKeys: (val) => {
    switch (val) {
      case 'Páramo': return 'paramo';
      case 'Humedal': return 'wetland';
      case 'Bosque Seco Tropical': return 'dryForest';
      default: return val;
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
      default: return val;
    }
  },
};
