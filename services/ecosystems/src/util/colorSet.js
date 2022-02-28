module.exports = {
  colorSet: (type) => {
    let color = [];
    switch (type) {
      case 'N':
        color = [12, 45, 66];
        break;
      case 'S':
        color = [54, 106, 120];
        break;
      case 'T':
        color = [51, 92, 84];
        break;
      default:
        break;
    }
    return color;
  },
};
