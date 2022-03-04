module.exports = {
  colorSet: (type) => {
    let color = [];
    switch (type) {
      case 'N':
        color = [22, 79, 116];
        break;
      case 'S':
        color = [96, 187, 212];
        break;
      case 'T':
        color = [90, 163, 148];
        break;
      default:
        break;
    }
    return color;
  },
};
