const { concatElements, mergeElements } = require("./5-merge");

const page1 = [
  {1: "Edet goes to calabar"},
  {2: "Edet visits his uncle in onitcha"},
];

const page2 = [
  {1: "Obi and his farmland"},
  {2: "obi discovers a mytery one day in his farmland"},
];

const pageObj1 = {
  fear: true,
  smell: -1033575916.9145899,
  wall: false,
  thing: -914767132,
};
const pageObj2= {
  1: 'Liam',
  2: 'Noah',
  3: 'Elijah',
  4: 'Oliver',
  5: 'Jacob',
  6: 'Lucas',
};

console.log("raw concat using a function\n", concatElements(page1, page2), concatElements(page1, page2).toJS());

console.log("concat using merge from immutable\n", mergeElements(pageObj1, pageObj2), mergeElements(pageObj1, pageObj2).toJS());
