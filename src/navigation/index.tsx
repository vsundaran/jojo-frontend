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
import CallInitiationScreen from '../screens/callInitiation';
import CallReceivingScreen from '../screens/callReceiving';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StorageKeys } from '../constants/StorageKeys';
import { View } from 'react-native';
import { Image } from 'react-native';
import { LayoutProvider } from '../context/LayoutContext';
import VideoCallScreen from '../screens/videoCall';


export const AppNavigator = ({
  setCurrentRouteName,
}: {
  setCurrentRouteName?: (route: string) => void;
}) => {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('welcome');

  const loadStorageData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN);
      const storedUser = await AsyncStorage.getItem(StorageKeys.USER_DATA);
      const hasSeenWelcome = await AsyncStorage.getItem(
        StorageKeys.HAS_SEEN_WELCOME,
      );

      if (storedToken && storedUser) {
        setInitialRouteName('app-layout');
        if (setCurrentRouteName) {
          setCurrentRouteName('app-layout');
        }
      } else if (hasSeenWelcome === 'true') {
        setInitialRouteName('app-layout');
        if (setCurrentRouteName) {
          setCurrentRouteName('app-layout');
        }
      }
    } catch (error) {
      console.error('Failed to load auth data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStorageData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <AuthProvider>
      <LayoutProvider>

        <View style={{ flex: 1, elevation: 0, boxShadow: 'none' }}>
          <NavigationContainer
            onStateChange={state => {
              const currentRouteName = state?.routes[state.index].name;
              if (setCurrentRouteName && currentRouteName) {
                setCurrentRouteName(currentRouteName);
              }
            }}
          >
            <Stack.Navigator
              initialRouteName={initialRouteName}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="welcome" component={Welcome} />
              <Stack.Screen name="app-layout" component={AppLayout} />
              <Stack.Screen
                name="moment-creating-form"
                component={MomentCreatingForm}
              />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen
                name="language-selection"
                component={LanguageSelectionScreen}
              />
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="otp-verification" component={OTPVerification} />
              <Stack.Screen name="locating-moment" component={CallInitiationScreen} />
              <Stack.Screen name="call-receiving" component={CallReceivingScreen} />
              <Stack.Screen name="video-call" component={VideoCallScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </LayoutProvider>
    </AuthProvider>
  );
};
