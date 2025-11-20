import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../automic-elements/header';
import { lightTheme } from '../../theme';
import ScrollingCategory from './scrollingCategory';
import Container from '../../automic-elements/container';
import { WishCard } from '../../automic-elements/wishCard';
import OTPVerification from '../otpVerification';
import LoginScreen from '../login';

export default function WallOfJoyScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
      {/* <OTPVerification /> */}
      <LoginScreen />
      {/* <Header /> */}
      <ScrollingCategory />
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // paddingBottom: 130,
          }
        }
      >
        <Container style={{ paddingVertical: 16, paddingHorizontal: 8 }}>
          <LinearGradient
            colors={lightTheme.colors.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 16,
              paddingHorizontal: 22,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}
          >
            <View style={{ height: 'auto' }}>
              <Text
                style={{
                  color: lightTheme.colors.text,
                  fontSize: 17,
                  textAlign: 'center',
                  fontWeight: 600,
                  lineHeight: 20,
                }}
              >
                💫 Join JoJo to Create moments & Give Joy
              </Text>

              <Text
                style={{
                  color: lightTheme.colors.text,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 16,
                  marginTop: 8,
                }}
              >
                Sign up to connect with real people to add joy to their moments
              </Text>
            </View>
          </LinearGradient>

          <WishCard
            title="Wishes"
            description="My fifth wedding anniversary ! I would like a heartfelt wishes."
            tags={['Wishes', 'Birthday']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.wishesColor}
            borderColor={lightTheme.colors.wishesBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Motivation"
            description="I have an interview tomorrow and I am bit nervous."
            tags={['Motivation', 'Interview']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.motivationColor}
            borderColor={lightTheme.colors.motivationBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Song"
            description="I would love to hear a  song"
            tags={['Song', 'Old Song']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Blessings"
            description="My fifth wedding anniversary !!!"
            tags={['Blessings', 'Anniversary']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Wishes"
            description="My fifth wedding anniversary ! I would like a heartfelt wishes."
            tags={['Wishes', 'Birthday']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.wishesColor}
            borderColor={lightTheme.colors.wishesBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Motivation"
            description="I have an interview tomorrow and I am bit nervous."
            tags={['Motivation', 'Interview']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.motivationColor}
            borderColor={lightTheme.colors.motivationBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Song"
            description="I would love to hear a  song"
            tags={['Song', 'Old Song']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Blessings"
            description="My fifth wedding anniversary !!!"
            tags={['Blessings', 'Anniversary']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Song"
            description="I would love to hear a  song"
            tags={['Song', 'Old Song']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />

          <WishCard
            title="Motivation"
            description="I have an interview tomorrow and I am bit nervous."
            tags={['Motivation', 'Interview']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.motivationColor}
            borderColor={lightTheme.colors.motivationBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Song"
            description="I would love to hear a  song"
            tags={['Song', 'Old Song']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Blessings"
            description="My fifth wedding anniversary !!!"
            tags={['Blessings', 'Anniversary']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Blessings"
            description="My fifth wedding anniversary !!!"
            tags={['Blessings', 'Anniversary']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Song"
            description="I would love to hear a  song"
            tags={['Song', 'Old Song']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.songColor}
            borderColor={lightTheme.colors.songBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
          <WishCard
            title="Blessings"
            description="My fifth wedding anniversary !!!"
            tags={['Blessings', 'Anniversary']}
            callCount={15}
            likeCount={12}
            onIconPress={() => console.log('Icon pressed')}
            onLikePress={() => console.log('Like pressed')}
            onCallPress={() => console.log('Call pressed')}
            onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
            primaryColor={lightTheme.colors.blessingsColor}
            borderColor={lightTheme.colors.blessingsBorderColor}
            containerStyle={{
              height: 'auto',
              minHeight: 190,
              justifyContent: 'center',
              marginTop: 16,
            }}
          />
        </Container>
      </ScrollView>
    </View>
  );
}
