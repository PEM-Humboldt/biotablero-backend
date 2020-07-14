module.exports = {
  persistenceKeys: (val) => {
    switch (val) {
      case 'Dinámicas': return 'dinamica';
      case 'Estables altas': return 'estable_alta';
      case 'Estables naturales': return 'estable_natural';
      default: return val;
    }
  },
};
