import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import MainAppNavigator from "./MainAppNavigator";

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) return null;

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainAppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}