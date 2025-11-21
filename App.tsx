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
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
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
        <View style={{ height: insets.top }}></View>
        <AppNavigator />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
