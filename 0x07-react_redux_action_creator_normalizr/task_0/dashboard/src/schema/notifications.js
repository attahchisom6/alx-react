import * as notifData from "../../../../notifications.json";


const getAllNotificationsByUser = (userId) => {
    const contextArray = notifData.default.filter((value) => value.author.id === userId).map((obj) => obj.context);
  return contextArray;
        
}

export default getAllNotificationsByUser;
