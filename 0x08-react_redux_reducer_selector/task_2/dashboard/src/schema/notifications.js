import * as notifData from "../../dist/notifications.json";
import { schema, normalize } from "normalizr";

const user = new schema.Entity("user");
const message = new schema.Entity("messages", {}, {idAttribute: "guid"});
const notification = new schema.Entity("notifications", {
  author: user,
  context: message,
});

const normalizedData = normalize(notifData.default, [notification]);


const getAllNotificationsByUser = (userId) => {
  // we overide the structure of notifData here with normalize structure

  const notifData = normalizedData.entities.notifications;
  const message = normalizedData.entities.messages;
  const contextArray = [];

  for (const id in notifData) {
    if (notifData[id].author === userId) {
      const contextId = notifData[id].context;
      contextArray.push(message[contextId]);
    }
  }
  return contextArray;
        
}

export default { getAllNotificationsByUser, normalizedData };;
