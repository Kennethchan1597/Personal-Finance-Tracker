import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

type AuthLayoutProps = { children: React.ReactNode; formStyle?: object };

export const AuthLayout = ({ children, formStyle }: AuthLayoutProps) => {

  return (
    <KeyboardAvoidingView behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={[styles.container]}
    >
      <StatusBar barStyle="default" />
      <View style={[styles.form, formStyle]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" },
  form: {
    position: "relative", backgroundColor: "white", padding: 20, borderRadius: 10, borderWidth: 1,
    width: 325,
    height: 460,
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