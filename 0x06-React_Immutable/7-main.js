const areMapsEqual = require("./7-equality");
const { Map } = require("immutable");

const map1 = new Map(
  {
    firstName: 'Guillaume',
    lastName: 'Salva',
  }
);

const map2 = new Map(
  {
    firstName: 'Guillaume',
    lastName: 'Salva',
  }
);

console.log(areMapsEqual(map1, map2) ? "True the Maps are Equal" : "False the Maps are:not Equal");
