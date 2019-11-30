import { createContext, useContext } from "react";

export const LoggedInUserContext = createContext(null);

export function useLoggedInUser() {
  const user = useContext(LoggedInUserContext);

  return user;
}
