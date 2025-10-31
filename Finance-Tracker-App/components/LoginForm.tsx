import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import authAxios from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { AuthLayout } from "./AuthLayout";

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Auth">;

export default function LoginForm() {
  const { login } = useAuth();

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ errorMessage?: string }>({});

  const handleLogin = async () => {
    try {
      const loginDto = { username, password };
      const response = await authAxios.post("/login", loginDto);
      const userDto = response.data.user
      console.log(userDto);
      await login(response.data.token, userDto ); // ✅ use context instead of manual AsyncStorage
      setError({ errorMessage: "" });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError({ errorMessage });
    }
  };

  return (
    <AuthLayout>
      <View style={{ top: 60 }}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} placeholder="username" keyboardType="ascii-capable" />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="password" secureTextEntry />
        {error.errorMessage ? <Text style={styles.error}>{error.errorMessage}</Text> : null}
        <Button title="Login" onPress={handleLogin} />
        <Button title="Forgot your password?" onPress={() => navigation.navigate("ForgotPassword")} />
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  header: { fontWeight: "bold", fontFamily: "arial", alignSelf: "center", marginTop: 10, marginBottom: 15, fontSize: 25 },
  error: { alignSelf: "center", margin: 6, color: "red", fontWeight: "bold" },
  label: { marginLeft: 12, fontWeight: "bold", fontSize: 16 },
  input: { height: 30, margin: 12, padding: 5, borderWidth: 1, borderRadius: 8, width: 250 },
  inputBox: { height: 200, borderWidth: 1, padding: 10, margin: 12, textAlignVertical: "top" },
  text: { fontSize: 20 },
})