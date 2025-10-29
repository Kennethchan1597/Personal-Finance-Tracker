import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import authAxios from "../../api/authApi";
import { AuthLayout } from "../../components/AuthLayout";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type OneTimePasswordScreenProps = NativeStackScreenProps<AuthStackParamList, "OneTimePassword">;

export default function OneTimePasswordScreen({ route, navigation }: OneTimePasswordScreenProps) {

  const [value, setValue] = useState("");
  const [error, setError] = useState<{ errorMessage?: string }>({});

  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value: value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = async () => {
    const success = await handleVerifyOtp();
    if (success) {
      navigation.replace("ResetPassword", { email: route.params.email, otp: value });
    }
  }


  const handleVerifyOtp = async (): Promise<boolean> => {
    try {
      const VerifyOtpDto = { email: route.params.email, inputOtp: value }
      await authAxios.post("/password/forgot/otp", VerifyOtpDto) // verifyOtp()
      return true;
    } catch (error: any) {
      setError({ errorMessage: error.response.data.message })
      return false;
    }
  }

  return (
    <AuthLayout formStyle={styles.formStyle} >
      <View>
        <Text style={styles.title}>Enter your 6-digit Code</Text>
        <CodeField
          ref={ref} // Enables keyboard auto-close
          {...props} // import the props from the hook => user experience
          cellCount={CELL_COUNT} // Number of input cells
          value={value}
          onChangeText={setValue}
          keyboardType="number-pad"
          textContentType="oneTimeCode" // OTP autofill
          renderCell={({ index, symbol, isFocused }) => {
            return (
              <View key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={[styles.cell, { borderColor: isFocused ? "#007AFF" : "#ccc", }]} >
                <Text > {symbol || (isFocused ? <Cursor cursorSymbol="🤷‍♀️" /> : null)} </Text>
              </View>
            )
          }} />
        {error.errorMessage ? <Text style={styles.error}>{error.errorMessage}</Text> : null}
        <Button title="Submit" onPress={handleSubmit}
          disabled={value.length !== 6} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  rootStyle: { width: 40, height: 50, margin: 20, borderWidth: 2 },
  error: { alignSelf: "center", margin: 6, color: "red", fontWeight: "bold" },
  title: { alignSelf: "center", fontWeight: "bold", padding: 15, fontSize: 20, marginBottom: 16 },
  formStyle: { height: 240 },
  cell: {
    width: 40,
    height: 45,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 14,
  },
  focusCell: {
    borderColor: '#000',
  },
})