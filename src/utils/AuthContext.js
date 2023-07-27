import React from "react";

export const AuthContext = React.createContext({
  signIn: (JWT, res) => {},
  signOut: () => {},
  setCurrentLocationData: () => {},
});
