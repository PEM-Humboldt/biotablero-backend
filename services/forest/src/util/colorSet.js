module.exports = {
  forestLPColorSet: (type) => {
    let color = [];
    switch (type) {
      case 'persistencia':
        color = [146, 171, 88];
        break;
      case 'perdida':
        color = [198, 84, 83];
        break;
      case 'no_bosque':
        color = [197, 181, 153];
        break;
      default:
        break;
    }
    return color;
  },
};
