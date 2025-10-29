import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import authAxios from "../../api/authApi";
import { AuthLayout } from "../../components/AuthLayout";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type ResetPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, "ResetPassword">

export default function ResetPasswordScreen({ route, navigation }: ResetPasswordScreenProps) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ errorMessage?: string }>({});
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (password === confirmPassword) {
      try {
        const PasswordResetDto = { newPassword: password, confirmPassword: confirmPassword, email: route.params.email, otp: route.params.otp }
        await authAxios.post("/password/reset", PasswordResetDto);
        Alert.alert("Reset Password successfully");
        setTimeout(() => {
          navigation.replace("Auth");
        }, 2000); // 2000 milliseconds = 2 seconds
      } catch (error: any) {
        setError(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (!confirmPassword) {
      setMessage("");
    } else if (confirmPassword === password) {
      setMessage("Password is matched");
    } else {
      setMessage("Password is not matched");
    }
  }, [password, confirmPassword]);

  return (
    <AuthLayout formStyle={styles.form}>
      <View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.label}>New Password</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={true} />
        <Text style={styles.label}>New Password Confirm</Text>
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry={true} />
        <Text style={styles.error}>{message}</Text>
        {error.errorMessage ? <Text style={styles.error}>{error.errorMessage}</Text> : null}
        <Button title="Reset password" onPress={handleResetPassword}
          disabled={password !== confirmPassword || !password || !confirmPassword} />
          <Button title="Back To Login" onPress={() => navigation.navigate("Auth")} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: { height: 375 },
  title: { alignSelf: "center", fontWeight: "bold", padding: 15, fontSize: 20, marginBottom: 16 },
  error: { alignSelf: "center", margin: 6, color: "red", fontWeight: "bold" },
  label: { marginLeft: 12, fontWeight: "bold", fontSize: 16 },
  input: { height: 30, margin: 12, padding: 5, borderWidth: 1, borderRadius: 8, width: 250 },
})