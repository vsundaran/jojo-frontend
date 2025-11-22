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
import { useAvailableMoments } from '../../hooks/useAvailableMoments';
import { MOMENT_CATEGORIES, Category } from '../../data/momentCategories';
import { ActivityIndicator } from 'react-native-paper';

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
  const { data, isLoading } = useAvailableMoments();
  const moments = data?.data?.moments || [];

  const getCategoryColors = (categoryName: string) => {
    const category = MOMENT_CATEGORIES.find(
      (c: Category) => c.id.toLowerCase() === categoryName?.toLowerCase()
    );
    return {
      primaryColor: category?.primaryColor || lightTheme.colors.wishesColor,
      borderColor: category?.borderColor || lightTheme.colors.wishesBorderColor,
    };
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: verticalScale(50) }}>
        <ActivityIndicator size="large" color={lightTheme.colors.primary} />
      </View>
    );
  }

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
          {moments.map((moment: any, index: number) => {
            const { primaryColor, borderColor } = getCategoryColors(moment.category);
            return (
              <WishCard
                key={moment._id || index}
                title={moment.category}
                description={moment.content}
                tags={[moment.category, moment.subCategory]}
                callCount={moment.callCount || 0}
                likeCount={moment.hearts || 0}
                onIconPress={() => console.log('Icon pressed')}
                onLikePress={() => console.log('Like pressed')}
                onCallPress={() => console.log('Call pressed')}
                onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
                primaryColor={primaryColor}
                borderColor={borderColor}
                containerStyle={{
                  height: 'auto',
                  marginTop: verticalScale(16),
                }}
              />
            );
          })}
        </Container>
      </ScrollView>
    </View>
  );
}
