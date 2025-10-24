import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OneTimePasswordScreen from './screens/OneTimePasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

export type RootStackParamList = {
  Auth: undefined,
  ForgotPassword: undefined
  OneTimePassword: {email: string}
  ResetPassword: {email: string, otp: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Auth" >
        <Stack.Screen name="Auth" component={AuthScreen} options={{title:"Welcome to tracker"}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OneTimePassword" component={OneTimePasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
