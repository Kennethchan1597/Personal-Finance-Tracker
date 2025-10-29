import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../screens/auth/AuthScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OneTimePasswordScreen from '../screens/auth/OneTimePasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

export type AuthStackParamList = {
  Auth: undefined,
  ForgotPassword: undefined
  OneTimePassword: { email: string }
  ResetPassword: { email: string, otp: string }
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {

  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OneTimePassword" component={OneTimePasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
