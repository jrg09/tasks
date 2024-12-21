import { UserContext } from "./userContext";
const user = {
   userId: 1,
   type: "",
   category: "",
};
export const UserProvider = ({ children }) => {
   return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
