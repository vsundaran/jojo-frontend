import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, RefreshControl, FlatList } from 'react-native';
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
import { useActiveMoments } from '../../hooks/useActiveMoments';
import { useMomentInteractions } from '../../hooks/useMomentInteractions';
import { MOMENT_CATEGORIES, Category } from '../../data/momentCategories';
import { ActivityIndicator } from 'react-native-paper';

export default function WallOfJoyScreen({ route, initialTab, timestamp, onNavigateToCreateMoment }: any) {
  const [isLoginCompleted, setIsLoginCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab || route?.params?.initialTab || '1');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
        <ScrollingCategory
          activeCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
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
            tabs.find((t) => t.key === key)?.label === 'JoJo Moments' ? <WallOfJoyContent category={selectedCategory} /> : <MyMomentsScreen onCreateMoment={onNavigateToCreateMoment} />
          )}
        />
      </View>
    </View>
  );
}

const WallOfJoyContent = ({ category }: { category: string }) => {
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useActiveMoments(category === 'All' ? '' : category);

  const { toggleHeart } = useMomentInteractions();

  const moments = data?.pages.flatMap(page => page.data.moments || []) || [];
  // const moments = data?.pages.flatMap(page => page.moments || []) || [];

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
      <FlatList
        data={moments}
        keyExtractor={(item, index) => item._id || index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            colors={[lightTheme.colors.primary]}
            tintColor={lightTheme.colors.primary}
          />
        }
        contentContainerStyle={{
          paddingBottom: verticalScale(130),
          paddingVertical: verticalScale(16),
          paddingHorizontal: scale(8),
        }}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" color={lightTheme.colors.primary} />
            </View>
          ) : !hasNextPage && moments.length > 0 ? (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{ color: lightTheme.colors.text, fontSize: moderateScale(14) }}>
                You have reached the end
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => {
          const { primaryColor, borderColor } = getCategoryColors(item.category);
          return (
            <WishCard
              title={item.category}
              description={item.content}
              tags={[item.category, item.subCategory]}
              callCount={item.callCount || 0}
              likeCount={item.hearts || 0}
              isLiked={item.hasHearted}
              onIconPress={() => console.log('Icon pressed')}
              onLikePress={() => toggleHeart(item._id, item.hasHearted || false)}
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
        }}
      />
    </View>
  );
}
