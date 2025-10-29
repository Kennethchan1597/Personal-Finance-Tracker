import React, { createContext, useState } from "react";

type ContextProps = { 
  username: string ;
  setUser: (username: string) => void;
}

const usernameContext = createContext<ContextProps>({
  username: "",
  setUser: () => { }
})

type ProviderProps = { children: React.ReactNode }

export const usernameProvider = ({ children }: ProviderProps) => {

  const [username, setUsername] = useState<string>("");

  const setUser = (usernames: string) => {
    setUsername(usernames);
  }

  return (
    <usernameContext.Provider value={{setUser, username}}>
      {children}
    </usernameContext.Provider>
  );
}
