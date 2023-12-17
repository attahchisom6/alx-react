const { is } = require("immutable");

const areMapsEqual = (map1, map2) => {
  return is(map1, map2);
}

module.exports = areMapsEqual;
