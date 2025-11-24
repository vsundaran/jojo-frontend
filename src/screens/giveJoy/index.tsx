import { ActivityIndicator, Image, ScrollView, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../../theme';
import GradientText from '../../automic-elements/gradientText';
import { CountCard } from './countCard';
import { useAvailableMomentsCount } from '../../hooks/useAvailableMomentsCount';

export default function Givejoy() {
  const { data, isLoading, isError } = useAvailableMomentsCount();

  // Helper function to get count for a specific category
  const getCategoryCount = (category: string): number => {
    if (!data?.data?.categoryCounts) return 0;
    const categoryData = data.data.categoryCounts.find(
      (item) => item._id.toLowerCase() === category.toLowerCase()
    );
    return categoryData?.count || 0;
  };

  return (
    <Container style={{ paddingTop: 0, flex: 1, paddingHorizontal: 42 }}>
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
                paddingHorizontal: 8,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 15,
                  borderColor: '#E9D4FF',
                  borderWidth: 5,
                  borderRadius: 100000,
                  backgroundColor: 'white',
                }}
              >
                <Image
                  source={require('../../assets/loveHeart.png')}
                  style={{
                    width: 24,
                    height: 24,
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
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 36,
            marginTop: 6,
          }}
        >
          Give Joy
        </GradientText>
        <Text
          style={{
            color: lightTheme.colors.darkText,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 20,
            marginVertical: 4,
            fontFamily: 'Poppins-Medium'
          }}
        >
          Choose a category and connect with someone who needs your support
        </Text>

        {isLoading && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={lightTheme.colors.wishesColor} />
          </View>
        )}

        <View style={{ marginTop: 2 }}>
          <CountCard
            title="Wishes"
            description="Celebrate special moments with someone"
            count={getCategoryCount('wishes')}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.wishesColor}
            borderColor={lightTheme.colors.wishesBorderColor}
            badgeColor="#F8E3FF"
            darkTextColor="#AE1AE2"
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
            description="Motivate someone with your positive vibes"
            count={getCategoryCount('motivation')}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.motivationColor}
            borderColor={lightTheme.colors.motivationBorderColor}
            badgeColor="#DDE8FF"
            darkTextColor="#5E8EF1"
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
            description="Sing a song to a stranger to share a joy"
            count={getCategoryCount('songs')}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            badgeColor="#D2FFEE"
            darkTextColor="#5ACEA1"
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
            title="Blessings"
            description="Send spiritual warmth and good wishes"
            count={getCategoryCount('blessings')}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            badgeColor="#FFF3DC"
            darkTextColor="#F0B847"
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
            count={getCategoryCount('celebrations')}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.celebrationColor}
            borderColor={lightTheme.colors.celebrationBorderColor}
            badgeColor="#FFE0E0"
            darkTextColor="#D34848"
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
