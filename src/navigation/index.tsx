import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import Welcome from '../screens/welcome';
import { Surface, Text } from 'react-native-paper';
import WallOfJoyScreen from '../screens/wallOfJoy';
import FooterNavigation from '../automic-elements/bottomNavigation';
import AppLayout from '../automic-elements/appLayout';
import { MomentCreatingForm } from '../screens/createMoment/momentcreatingForm';
import Signup from '../screens/signup';
import LoginScreen from '../screens/login';
import LanguageSelectionScreen from '../screens/languageSelection';
import OTPVerification from '../screens/otpVerification';
import { AuthProvider } from '../context/AuthContext';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <Surface style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="app-layout" component={AppLayout} />
            <Stack.Screen name="moment-creating-form" component={MomentCreatingForm} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="language-selection" component={LanguageSelectionScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="otp-verification" component={OTPVerification} />
          </Stack.Navigator>
        </NavigationContainer>
      </Surface>
    </AuthProvider>
  );
};
