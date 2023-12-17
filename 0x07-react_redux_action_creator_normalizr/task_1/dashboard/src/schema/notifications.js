import * as notifData from "../../../../notifications.json";
import { schema, normalize } from "normalizr";

const user = new schema.Entity("user");
const message = new schema.Entity("messages", {}, {idAttribute: "guid"});
const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

const normalizedData = normalize(notifData.default, [notification]);


const getAllNotificationsByUser = (userId) => {
  const contextArray = notifData.default.filter((value) => value.author.id === userId).map((obj) => obj.context);
  return contextArray;
        
}

export default { getAllNotificationsByUser, normalizedData };;
