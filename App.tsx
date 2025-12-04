/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation';
import { PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/theme/paperTheme';
import { socketService } from './src/services/socketService';
import React, { useEffect, useState } from 'react';
import { MessageProvider } from './src/context/MessageContext';
import { MessageBar } from './src/automic-elements/messageBar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from './src/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from './src/constants/StorageKeys';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

MaterialIcons.loadFont();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    socketService.initialize();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <MessageProvider>
          <MessageBar />
          <AppContent />
        </MessageProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [currentRouteName, setCurrentRouteName] = useState<string>('welcome');

  const whiteStatusBarRoutes = [
    'welcome',
    'signup',
    'language-selection',
    'login',
    'otp-verification',
  ];

  const isWhiteStatusBar = whiteStatusBarRoutes.includes(currentRouteName);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {isWhiteStatusBar ? (
          <View style={{ height: insets.top, backgroundColor: 'white' }}>
            <StatusBar
              barStyle="dark-content"
              translucent={true}
              backgroundColor="transparent"
            />
          </View>
        ) : (
          <LinearGradient
            colors={lightTheme.colors.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: insets.top }}
          >
            <StatusBar
              barStyle="dark-content"
              translucent={true}
              backgroundColor="transparent"
            />
          </LinearGradient>
        )}
        <AppNavigator setCurrentRouteName={setCurrentRouteName} />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
