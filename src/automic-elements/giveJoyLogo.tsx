import { Avatar } from 'react-native-paper';
import { lightTheme } from '../theme';
import { View, Image, StyleSheet } from 'react-native';

export default function GiveJoyLogo() {
  return (
    <View style={styles.container}>
      {/* Background Icon */}
      <Image
        source={require('../assets/iconsBackground.png')}
        style={styles.backgroundImage}
      />

      {/* Inner White Circle */}
      <View style={styles.innerCircle}>
        <Image
          style={{
            backgroundColor: 'transparent',
            width: 54,
            height: 54,
            resizeMode: 'contain',
          }}
          source={require('../assets/givJoyLogo.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 1000,
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    backgroundColor: lightTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 40,
  },
});
