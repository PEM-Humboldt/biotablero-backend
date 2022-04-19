module.exports = {
  coveragesColorSet: (type) => {
    let color = [];
    switch (type) {
      case 'N':
        color = [25, 80, 116];
        break;
      case 'S':
        color = [252, 189, 100];
        break;
      case 'T':
        color = [205, 113, 101];
        break;
      case 'X':
        color = [200, 189, 167];
        break;
      default:
        break;
    }
    return color;
  },
};
