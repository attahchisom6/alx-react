import { Map } from "immutable";

export default function accessImmutableObject(object, array) {
  try {
    const immutableObject = Map(object);
    return immutableObject.getIn(array);
  } catch(error) {
    return (`${object} parsed as undefined:`, error);
  }
}
