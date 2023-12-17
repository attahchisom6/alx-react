const { List, Map } = require("immutable");

const concatElements = (page1, page2) => {
  concatedPages = List(page1);
  concatedPages = concatedPages.concat(List(page2));
  return concatedPages;
}

const mergeElements = (page1, page2) => {
  const useIfEqual = Map(page2);
  const mergedPages = Map(page1).merge(useIfEqual);
  return mergedPages;
};

module.exports = { mergeElements, concatElements };
