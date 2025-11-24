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
import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from './src/theme';

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
        <AppContent />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
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
        <AppNavigator />
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
