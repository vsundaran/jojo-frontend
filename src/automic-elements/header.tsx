import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../theme';
import { Image, View } from 'react-native';
import logo from '../assets/logo.png';
import { Avatar } from 'react-native-paper';

export default function Header() {
  return (
    <LinearGradient
      colors={lightTheme.colors.gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: lightTheme.spacing.md,
      }}
    >
      <View
        style={{ borderRadius: lightTheme.borderRadius.lg, overflow: 'hidden' }}
      >
        <Image source={logo} style={{ width: 50, height: 50 }} />
      </View>

      <Avatar.Text
        size={44}
        label="G"
        style={{ backgroundColor: lightTheme.colors.background }}
      />
    </LinearGradient>
  );
}
