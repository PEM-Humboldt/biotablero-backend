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
};
