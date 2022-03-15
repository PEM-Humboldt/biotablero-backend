module.exports = {
  coveragesColorSet: (type) => {
    let color = [];
    switch (type) {
      case 'N':
        color = [38, 186, 164];
        break;
      case 'S':
        color = [89, 61, 113];
        break;
      case 'T':
        color = [22, 79, 116];
        break;
      case 'X':
        color = [255, 255, 0];
        break;
      default:
        break;
    }
    return color;
  },
};
