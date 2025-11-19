import { View } from 'react-native';
import { WelcomeText } from '../../automic-elements/welcomeText';
import MainLogo from '../../automic-elements/mainLogo';
import { MainText } from '../../automic-elements/text';
import { Surface } from 'react-native-paper';
import { SubText } from '../../automic-elements/subText';
import VideoCallLogo from '../../automic-elements/videoCallLogo';
import SafeAndPrivateLogo from '../../automic-elements/safeAndPrivateLogo';

export default function SafePrivateScreen() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View>
        <SafeAndPrivateLogo />
      </View>
      <View style={{ marginTop: 15 }}>
        <WelcomeText>Safe & Private</WelcomeText>
      </View>
      <View style={{ marginTop: 15 }}>
        <MainText>Your safety matters</MainText>
      </View>
      <View style={{ marginTop: 15 }}>
        <SubText>
          Connect with peace of mind. There are no public profiles, and every
          30-second call is fleeting. Your safety is our priority, with simple
          report and block features.
        </SubText>
      </View>
    </View>
  );
}
