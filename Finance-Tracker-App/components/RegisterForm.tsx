import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import authAxios from "../api/api";
import { AuthLayout } from "./AuthLayout";

export default function RegisterForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<{ errorMessage?: string }>({});

  const handleRegister = async () => {
    try {
      const signUpDto = { username, password, email };
      await authAxios.post("/register", signUpDto);
      setError({ errorMessage: "" });
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setError({ errorMessage });
    }
  }

  return (
    <AuthLayout>
      <View>
        <Text style={styles.header}>Register</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} placeholder="username" />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="password" secureTextEntry />
        <Text style={styles.label}>Password Confirm</Text>
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} placeholder="password confirm" secureTextEntry />
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="email" secureTextEntry />
        {error.errorMessage ? <Text style={styles.error}>{error.errorMessage}</Text> : null}
        <Button title="Register" onPress={handleRegister} />
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