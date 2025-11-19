import { View } from 'react-native';
import Header from './header';
import FooterNavigation from './bottomNavigation';
import WallOfJoyScreen from '../screens/wallOfJoy';

export default function AppLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FooterNavigation />
    </View>
  );
}
