import React from "react";

export const user = {
  password: "",
  email: "",
  isLoggedIn: false,
}

export function logOut() {
}

export const AppContext = React.createContext({
  user,
  logOut,
});
