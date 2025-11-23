import { View } from 'react-native';
import { WelcomeText } from '../../automic-elements/welcomeText';
import MainLogo from '../../automic-elements/mainLogo';
import { MainText } from '../../automic-elements/text';
import { Surface } from 'react-native-paper';
import { SubText } from '../../automic-elements/subText';
import VideoCallLogo from '../../automic-elements/videoCallLogo';
import GiveJoyLogo from '../../automic-elements/giveJoyLogo';

export default function GiveJoyScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, paddingRight: 30 }}>
      <View>
        <GiveJoyLogo />
      </View>
      <View style={{ marginTop: 15 }}>
        <WelcomeText>Give Joy </WelcomeText>
      </View>
      <View style={{ marginTop: 15 }}>
        <MainText>Be someone's reason to smile</MainText>
      </View>
      <View style={{ marginTop: 15, maxWidth: '100%' }}>
        <SubText>
          Ready to make someone's day? Choose a category like "Motivation" or
          "Wishes," and we'll instantly connect you to a live Moment.
        </SubText>
      </View>
    </View>
  );
}
