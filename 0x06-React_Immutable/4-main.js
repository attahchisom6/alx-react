// import { map, map2 } from "./4-mutations";
const { map, map2 } = require("./4-mutations");
console.log("this is map:\n", map);
console.log("this is map1\n", map2);

console.log("this is map to js format array", map.toJS());
console.log("this is map2 to js format array", map2.toJS());

