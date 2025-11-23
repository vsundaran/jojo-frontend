import { View } from 'react-native';
import { WelcomeText } from '../../automic-elements/welcomeText';
import MainLogo from '../../automic-elements/mainLogo';
import { MainText } from '../../automic-elements/text';
import { Surface } from 'react-native-paper';
import { SubText } from '../../automic-elements/subText';

export default function WelcomeScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, paddingRight: 30 }}>
      <View>
        <MainLogo />
      </View>
      <View style={{ marginTop: 8 }}>
        <WelcomeText>Welcome to JoJo</WelcomeText>
      </View>
      <View style={{ marginTop: 15 }}>
        <MainText>Joy of Just once - Be real, be human</MainText>
      </View>
      <View style={{ marginTop: 15, maxWidth: '100%' }}>
        <SubText>
          Ditch the feed and just feel. Connect in authentic 30-second moments.
          No followers, no likes, just genuine human connection.
        </SubText>
      </View>
    </View>
  );
}
