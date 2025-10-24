import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import authAxios from "../api/api";
import { RootStackParamList } from "../App";

type ForgotPasswordScreenProp = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProp) {

  const [email, setEmail] = useState("");
  const [message, setMessage] =useState("");
  const [error, setError] = useState<{ errorMessage?: string }>({});

  const handleSubmit = async () => {
    setError({ errorMessage: "" });
    try {
      const success = await handleSendPasswordForgotEmail();
      if (success) {
        console.log(message);
        Alert.alert(message);
        navigation.navigate("OneTimePassword", {email: email});
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const handleSendPasswordForgotEmail = async (): Promise<boolean> => {
    try {
      const response = await authAxios.post("/password/forgot", { email });
      setMessage(response.data);
      setError({ errorMessage: "" });
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Unknown error";
      setError({ errorMessage });
      return false;
    }    
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.form}>
        <Text style={styles.header}>Forgot Password</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="email" />
        {error.errorMessage ? <Text style={styles.error}>{error.errorMessage}</Text> : null}
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Back To Login" onPress={() => navigation.navigate("Auth")} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" },
  header: { fontWeight: "bold", fontFamily: "arial", alignSelf: "center", marginTop: 10, marginBottom: 30, fontSize: 25 },
  error: { alignSelf: "center", margin: 6, color: "red", fontWeight: "bold" },
  label: { marginLeft: 12, fontWeight: "bold", fontSize: 16 },
  input: { height: 30, margin: 12, padding: 5, borderWidth: 1, borderRadius: 8, width: 250 },
  inputBox: { height: 200, borderWidth: 1, padding: 10, margin: 12, textAlignVertical: "top" },
  text: { fontSize: 20 },

  form: {
    position: "relative", backgroundColor: "white", padding: 20, borderRadius: 10, borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5
      }
    })
  },
})