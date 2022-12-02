import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {
  LoggedInUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setLoggedUser(currentUser !== null);
    console.log(loggedUser);
  }, [currentUser, loggedUser]);

  return (
    <UserContext.Provider value={loggedUser}>{children}</UserContext.Provider>
  );
};
