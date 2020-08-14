module.exports = {
  persistenceKeys: (val) => {
    switch (val) {
      case 'Dinámicas': return 'dinamica';
      case 'Estables altas': return 'estable_alta';
      case 'Estables naturales': return 'estable_natural';
      default: return val;
    }
  },
  HFCategoriesKeys: (val) => {
    switch (val) {
      case 'Natural': return 'natural';
      case 'Baja': return 'baja';
      case 'Media': return 'media';
      case 'Alta': return 'alta';
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
