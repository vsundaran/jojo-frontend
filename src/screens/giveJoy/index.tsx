import { ActivityIndicator, Image, ScrollView, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../../theme';
import GradientText from '../../automic-elements/gradientText';
import { CountCard } from './countCard';
import { useAvailableMomentsCount } from '../../hooks/useAvailableMomentsCount';
import { scale, verticalScale } from 'react-native-size-matters';

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
    <Container style={{ paddingTop: verticalScale(55), flex: 1, paddingHorizontal: scale(42) }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: verticalScale(15) }}>
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
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: verticalScale(20),
                // Ensure the gradient container is also square if it's meant to be a circle
                // The inner content will dictate the size, so we'll ensure the inner most circle is perfect.
              }}
            >
              <View style={{
                paddingHorizontal: scale(8),
                paddingVertical: scale(8), // Use scale for vertical padding too to maintain aspect ratio
                borderRadius: 100000,
                overflow: 'hidden',
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', // Center content vertically as well
                    padding: scale(15),
                    borderColor: '#E9D4FF',
                    borderWidth: 5,
                    borderRadius: 100000,
                    backgroundColor: 'white',
                    // Explicitly set width and height or use aspectRatio to ensure a perfect circle
                    width: scale(22 + 15 * 2), // Image width + 2 * padding
                    height: scale(22 + 15 * 2), // Image height + 2 * padding
                  }}
                >
                  <Image
                    source={require('../../assets/loveHeart.png')}
                    style={{
                      width: scale(22),
                      height: scale(22),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
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
        <View style={{ marginBottom: verticalScale(75) }}>
          <View style={{ marginTop: verticalScale(2) }}>
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
                // minHeight: 110,
                justifyContent: 'center',
                marginTop: verticalScale(10),
              }}
              isLoading={isLoading}
            />
          </View>
          <View style={{ marginTop: verticalScale(2) }}>
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
                // minHeight: 110,
                justifyContent: 'center',
                marginTop: verticalScale(10),
              }}
              isLoading={isLoading}
            />
          </View>
          <View style={{ marginTop: verticalScale(2) }}>
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
                //  minHeight: 110,
                justifyContent: 'center',
                marginTop: verticalScale(10),
              }}
              isLoading={isLoading}
            />
          </View>
          <View style={{ marginTop: verticalScale(2) }}>
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
                // minHeight: 110,
                justifyContent: 'center',
                marginTop: verticalScale(10),
              }}
              isLoading={isLoading}
            />
          </View>
          <View style={{ marginTop: verticalScale(2), marginBottom: verticalScale(20) }}>
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
                // minHeight: 110,
                justifyContent: 'center',
                marginTop: verticalScale(10),
              }}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>

      {/* <Image
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
      /> */}
    </Container>
  );
}
