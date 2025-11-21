import { View } from 'react-native';
import Header from './header';
import FooterNavigation from './bottomNavigation';
import WallOfJoyScreen from '../screens/wallOfJoy';

export default function AppLayout({ route }: any) {
  const initialTab = route?.params?.initialTab;
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FooterNavigation initialTab={initialTab} />
    </View>
  );
}
