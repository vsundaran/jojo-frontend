import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import Welcome from '../screens/welcome';
import { Surface, Text } from 'react-native-paper';
import WallOfJoyScreen from '../screens/wallOfJoy';
import FooterNavigation from '../automic-elements/bottomNavigation';
import AppLayout from '../automic-elements/appLayout';
import { MomentCreatingForm } from '../screens/createMoment/momentcreatingForm';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  // export default function HomeScreen({ navigation }) {
  //   return (
  //     <View>
  //       <Text>Home Screen</Text>
  //       <Button
  //         title="Go to Profile"
  //         onPress={() => navigation.navigate("Profile")}
  //       />
  //     </View>
  //   );
  // }

  return (
    <Surface style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="moment-creating-form"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="app-layout" component={AppLayout} />
          <Stack.Screen name="moment-creating-form" component={MomentCreatingForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Surface>
  );
};
