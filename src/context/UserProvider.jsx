import { useState } from "react";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userConfig")) || {
      userId: 1,
    }
  );

  const updateUser = (type, category) => {
    localStorage.setItem("userConfig", JSON.stringify({ ...user, [type]: category }));
    setUser((user) => ({ ...user, [type]: category }));
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};
