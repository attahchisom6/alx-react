import { List } from "immutable";

export function getListObject(array) {
  const immutableArray = List(array);
  return immutableArray;
}

export function addElementToList(list, element) {
  const updatedList = list.push(element);
  return updatedList;
}
