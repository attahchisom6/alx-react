// 6-main.js
const { mergeDeeplyElements } = require("./6-deeply");

const pageObj1 = {
  'user-1': {
    id: 1,
    name: 'test',
    likes: {
      1: {
        uid: 1234,
      }
    }
  },
};

const pageObj2 = {
  'user-1': {
    likes: {
      2: {
        uid: 134,
      }
    }
  },
};

console.log("merge deep, like keys not overwritten\n", JSON.stringify(mergeDeeplyElements(pageObj1, pageObj2).toJS(), null, 2));
