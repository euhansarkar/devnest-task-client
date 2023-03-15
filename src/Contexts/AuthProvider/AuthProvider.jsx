import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  

  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.getItem(`devNest-user`)) {
        setCurrentUser(await JSON.parse(localStorage.getItem(`devNest-user`)));
      }
    };
    loadUser();
  }, []);

  const authInfo = {currentUser}

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const {currentUser} = useContext(AuthContext);
  return currentUser;
}

export default AuthProvider;
