import { View } from 'react-native';
import { WelcomeText } from '../../automic-elements/welcomeText';
import MainLogo from '../../automic-elements/mainLogo';
import { MainText } from '../../automic-elements/text';
import { Surface } from 'react-native-paper';
import { SubText } from '../../automic-elements/subText';
import VideoCallLogo from '../../automic-elements/videoCallLogo';

export default function MomentsScreen() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View>
        <VideoCallLogo />
      </View>
      <View style={{ marginTop: 15 }}>
        <WelcomeText>Create Your Moments</WelcomeText>
      </View>
      <View style={{ marginTop: 15 }}>
        <MainText>Create moments that multiply joy</MainText>
      </View>
      <View style={{ marginTop: 15 }}>
        <SubText>
          Share a win, a celebration, or a need for motivation. You create the
          Moment, and the community brings the joy.
        </SubText>
      </View>
    </View>
  );
}
