import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import { lightTheme } from '../../theme';
import { CategoryCard } from './category';

export default function CreateMomentScreen({ navigation }: any) {
  const navigateToMomentCreatingForm = () => {
    console.log('navigateToMomentCreatingForm');
    navigation.navigate('MomentCreatingForm');
  };
  return (
    <Container style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
      <Text
        style={{
          color: lightTheme.colors.darkText,
          fontSize: 30,
          fontWeight: 500,
          lineHeight: 36,
        }}
      >
        Create your moment
      </Text>
      <Text
        style={{
          color: lightTheme.colors.darkText,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 20,
          marginTop: 10,
          marginBottom: 48,
        }}
      >
        Create your moment to let someone share your Joy for 30 seconds.
      </Text>
      <Text
        style={{
          color: lightTheme.colors.darkText,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 20,
          marginTop: 10,
        }}
      >
        Choose Category
      </Text>
      <View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <CategoryCard
            title="Wishes"
            onPress={navigateToMomentCreatingForm}
            primaryColor={lightTheme.colors.wishesColor}
            borderColor={lightTheme.colors.wishesBorderColor}
            bgColor="#FBEFFF"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 10,
            }}
          />
          <CategoryCard
            title="Motivation"
            onPress={navigateToMomentCreatingForm}
            primaryColor={lightTheme.colors.motivationColor}
            borderColor={lightTheme.colors.motivationBorderColor}
            bgColor="#EDF3FF"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 10,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <CategoryCard
            title="Song"
            onPress={navigateToMomentCreatingForm}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            bgColor="#E7F9EC"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 10,
            }}
          />
          <CategoryCard
            title="Blessings"
            onPress={navigateToMomentCreatingForm}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            bgColor="#FFF8EA"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 10,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <CategoryCard
            title="Celebration"
            onPress={navigateToMomentCreatingForm}
            primaryColor={lightTheme.colors.celebrationColor}
            borderColor={lightTheme.colors.celebrationBorderColor}
            bgColor="#FFEBEB"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 10,
            }}
          />
          <View style={{ flex: 1, marginLeft: 45 }}></View>
        </View>
      </View>
    </Container>
  );
}
