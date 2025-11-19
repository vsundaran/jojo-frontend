import { Image, ScrollView, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../../theme';
import GradientText from '../../automic-elements/gradientText';
import { CountCard } from './countCard';

export default function Givejoy() {
  return (
    <Container style={{ paddingTop: 0, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <View>
            <LinearGradient
              colors={lightTheme.colors.gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 100000,
                paddingHorizontal: 22,
                paddingVertical: 18,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 35,
                  borderColor: '#E9D4FF',
                  borderWidth: 5,
                  borderRadius: 100000,
                  backgroundColor: 'white',
                }}
              >
                <Image
                  source={require('../../assets/loveHeart.png')}
                  style={{
                    width: 64,
                    height: 64,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </LinearGradient>
          </View>
        </View>
        <GradientText
          // variant="displayMedium"
          style={{
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 400,
            lineHeight: 36,
            marginTop: 12,
          }}
        >
          Give Joy
        </GradientText>
        <Text
          style={{
            color: lightTheme.colors.text,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 20,
            marginVertical: 10,
          }}
        >
          Choose a category and connect with someone who needs your support
        </Text>

        <View style={{ marginTop: 2 }}>
          <CountCard
            title="Wishes"
            description="Celebrate special moments with someone"
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.wishesColor}
            borderColor={lightTheme.colors.wishesBorderColor}
            badgeColor="#F8E3FF"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
        </View>
        <View style={{ marginTop: 2 }}>
          <CountCard
            title="Motivation"
            description="Celebrate special moments with someone"
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.motivationColor}
            borderColor={lightTheme.colors.motivationBorderColor}
            badgeColor="#DDE8FF"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
        </View>
        <View style={{ marginTop: 2 }}>
          <CountCard
            title="Song"
            description="Celebrate special moments with someone"
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            badgeColor="#D2FFEE"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
        </View>
        <View style={{ marginTop: 2, marginBottom: 8 }}>
          <CountCard
            title="Celebration"
            description="Celebrate special moments with someone"
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.celebrationColor}
            borderColor={lightTheme.colors.celebrationBorderColor}
            badgeColor="#FFE0E0"
            containerStyle={{
              height: 'auto',
              minHeight: 110,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
        </View>
      </ScrollView>

      <Image
        source={require('../../assets/pinkStar.png')}
        style={{
          width: 204,
          height: 204,
          resizeMode: 'contain',
          opacity: 0.1,
          position: 'absolute',
          top: -50,
          left: 230,
        }}
      />
    </Container>
  );
}
