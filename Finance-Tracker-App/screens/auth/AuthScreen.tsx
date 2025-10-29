import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import FormToggleButton from "../../components/FormToggleButton";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, "Auth">;

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(prev => !prev); // flip between login and register
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FormToggleButton isLogin={isLogin} onClick={handleToggle} />
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </View>
  );
}
