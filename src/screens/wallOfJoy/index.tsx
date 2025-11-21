import React, { useState, useEffect } from 'react';
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
import Signup from '../signup';
import LanguageSelectionScreen from '../languageSelection';
import CustomTabs from '../../automic-elements/customTabs';
import MyMomentsScreen from '../myMoments';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function WallOfJoyScreen({ route, initialTab, timestamp }: any) {
  const [isLoginCompleted, setIsLoginCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab || route?.params?.initialTab || '1');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, timestamp]);

  const tabs: any[] = [
    { key: '1', label: 'JoJo Moments', icon: 'creation' },
    { key: '2', label: 'My Moments', icon: 'home-outline' },
  ];

  const handleLoginComplete = () => {
    setIsLoginCompleted(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>


      {/* {isLoginCompleted ? (
        <OTPVerification />
      ) : (
        <LoginScreen handleLogin={handleLoginComplete} />
      )} */}
      {/* <Signup /> */}
      {/* <LanguageSelectionScreen /> */}
      <View style={{ paddingVertical: verticalScale(3), justifyContent: 'center', alignItems: 'center' }}>
        <ScrollingCategory />
      </View>
      <View style={{ marginBottom: verticalScale(6) }}>
        <Divider />
      </View>
      <View style={{ paddingHorizontal: scale(6), flex: 1 }}>
        <CustomTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          renderContent={(key) => (
            tabs.find((t) => t.key === key)?.label === 'JoJo Moments' ? <WallOfJoyContent /> : <MyMomentsScreen />
          )}
        />
      </View>
    </View>
  );
}

const WallOfJoyContent = () => {
  const wishesData = [
    {
      title: "Wishes",
      description: "My fifth wedding anniversary ! I would like a heartfelt wishes.",
      tags: ['Wishes', 'Birthday'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.wishesColor,
      borderColor: lightTheme.colors.wishesBorderColor,
    },
    {
      title: "Motivation",
      description: "I have an interview tomorrow and I am bit nervous.",
      tags: ['Motivation', 'Interview'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.motivationColor,
      borderColor: lightTheme.colors.motivationBorderColor,
    },
    {
      title: "Song",
      description: "I would love to hear a  song",
      tags: ['Song', 'Old Song'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.songColor,
      borderColor: lightTheme.colors.songBorderColor,
    },
    {
      title: "Blessings",
      description: "My fifth wedding anniversary !!!",
      tags: ['Blessings', 'Anniversary'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.blessingsColor,
      borderColor: lightTheme.colors.blessingsBorderColor,
    },
    {
      title: "Wishes",
      description: "My fifth wedding anniversary ! I would like a heartfelt wishes.",
      tags: ['Wishes', 'Birthday'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.wishesColor,
      borderColor: lightTheme.colors.wishesBorderColor,
    },
    {
      title: "Motivation",
      description: "I have an interview tomorrow and I am bit nervous.",
      tags: ['Motivation', 'Interview'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.motivationColor,
      borderColor: lightTheme.colors.motivationBorderColor,
    },
    {
      title: "Song",
      description: "I would love to hear a  song",
      tags: ['Song', 'Old Song'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.songColor,
      borderColor: lightTheme.colors.songBorderColor,
    },
    {
      title: "Blessings",
      description: "My fifth wedding anniversary !!!",
      tags: ['Blessings', 'Anniversary'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.blessingsColor,
      borderColor: lightTheme.colors.blessingsBorderColor,
    },
    {
      title: "Song",
      description: "I would love to hear a  song",
      tags: ['Song', 'Old Song'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.songColor,
      borderColor: lightTheme.colors.songBorderColor,
    },
    {
      title: "Motivation",
      description: "I have an interview tomorrow and I am bit nervous.",
      tags: ['Motivation', 'Interview'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.motivationColor,
      borderColor: lightTheme.colors.motivationBorderColor,
    },
    {
      title: "Song",
      description: "I would love to hear a  song",
      tags: ['Song', 'Old Song'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.songColor,
      borderColor: lightTheme.colors.songBorderColor,
    },
    {
      title: "Blessings",
      description: "My fifth wedding anniversary !!!",
      tags: ['Blessings', 'Anniversary'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.blessingsColor,
      borderColor: lightTheme.colors.blessingsBorderColor,
    },
    {
      title: "Blessings",
      description: "My fifth wedding anniversary !!!",
      tags: ['Blessings', 'Anniversary'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.blessingsColor,
      borderColor: lightTheme.colors.blessingsBorderColor,
    },
    {
      title: "Song",
      description: "I would love to hear a  song",
      tags: ['Song', 'Old Song'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.songColor,
      borderColor: lightTheme.colors.songBorderColor,
    },
    {
      title: "Blessings",
      description: "My fifth wedding anniversary !!!",
      tags: ['Blessings', 'Anniversary'],
      callCount: 15,
      likeCount: 12,
      primaryColor: lightTheme.colors.blessingsColor,
      borderColor: lightTheme.colors.blessingsBorderColor,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            paddingBottom: verticalScale(130),
          }
        }
      >
        <Container style={{ paddingVertical: verticalScale(16), paddingHorizontal: scale(8) }}>
          {/* <LinearGradient
            colors={lightTheme.colors.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: moderateScale(16),
              paddingHorizontal: scale(22),
              paddingVertical: verticalScale(18),
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: verticalScale(100),
            }}
          >
            <View style={{ height: 'auto' }}>
              <Text
                style={{
                  color: lightTheme.colors.text,
                  fontSize: moderateScale(17),
                  textAlign: 'center',
                  fontWeight: '600',
                  lineHeight: verticalScale(20),
                }}
              >
                💫 Join JoJo to Create moments & Give Joy
              </Text>

              <Text
                style={{
                  color: lightTheme.colors.text,
                  textAlign: 'center',
                  fontSize: moderateScale(14),
                  fontWeight: '500',
                  lineHeight: verticalScale(16),
                  marginTop: verticalScale(8),
                }}
              >
                Sign up to connect with real people to add joy to their moments
              </Text>
            </View>
          </LinearGradient> */}

          {wishesData.map((wish, index) => (
            <WishCard
              key={index}
              title={wish.title}
              description={wish.description}
              tags={wish.tags}
              callCount={wish.callCount}
              likeCount={wish.likeCount}
              onIconPress={() => console.log('Icon pressed')}
              onLikePress={() => console.log('Like pressed')}
              onCallPress={() => console.log('Call pressed')}
              onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
              primaryColor={wish.primaryColor}
              borderColor={wish.borderColor}
              containerStyle={{
                height: 'auto',
                marginTop: verticalScale(16),
              }}
            />
          ))}
        </Container>
      </ScrollView>
    </View>
  );
}
