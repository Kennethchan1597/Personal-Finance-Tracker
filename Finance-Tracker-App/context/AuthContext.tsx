import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserDto = {
  id: number;
  username: string;
  email: string;
  defaultCurrency: string;
  role: string
};

type AuthContextType = {
  isLoggedIn: boolean | null;
  login: (token: string, userDto: UserDto) => Promise<void>;
  logout: () => Promise<void>;
  userDto: UserDto | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  login: async () => {},
  logout: async () => {},
  userDto: null,
});

export let globalLogout: (() => Promise<void>) | null = null;
export let globalLogout2: (() => Promise<void>);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userDto, setUserDto] = useState<UserDto | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userJson = await AsyncStorage.getItem("userDto");
        if (token && userJson) {
          setUserDto(JSON.parse(userJson));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to load auth data", error);
        setIsLoggedIn(false);
      }
    };
    loadAuthData();
  }, []);

  const login = async (token: string, userDto: UserDto) => {
    await AsyncStorage.multiSet([
      ["authToken", token],
      ["userDto", JSON.stringify(userDto)],
    ]);
    setUserDto(userDto);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["authToken", "userDto"]);
    setUserDto(null);
    setIsLoggedIn(false);
  };

  globalLogout = logout;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userDto }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);