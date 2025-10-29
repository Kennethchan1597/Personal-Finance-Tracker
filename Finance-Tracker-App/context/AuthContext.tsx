import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean | null;
  login: (token: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  username: string;
  setUser: (username: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  login: async () => { },
  logout: async () => { },
  username: "",
  setUser: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const loadAuthData = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const storedUsername = await AsyncStorage.getItem("username");
      setIsLoggedIn(!!token);
      setUsername(storedUsername || "")
    };
    loadAuthData();
  }, []);

  const login = async (token: string, usernames: string) => {
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem("username", usernames);
    setUsername(usernames)
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["authToken", "username"]);
    setIsLoggedIn(false);
    setUsername("");
  };

  const setUser = async (username: string) => {
    await AsyncStorage.setItem("username", username);
    setUsername(username);
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);