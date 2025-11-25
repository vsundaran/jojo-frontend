import React, { useState, useEffect } from 'react';
import { ScrollView, View, RefreshControl, FlatList } from 'react-native';
import { Divider, Text } from 'react-native-paper';
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
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { socketService, MomentEventPayload } from '../../services/socketService';
import { NoMoments } from '../myMoments/NoMoments';

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
    { key: '2', label: 'My Moments', icon: 'account' },
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
      <View style={{ marginBottom: verticalScale(4) }}>
        <Divider />
      </View>
      <View style={{ paddingHorizontal: scale(6), flex: 1 }}>
        <CustomTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          renderContent={(key) => (
            tabs.find((t) => t.key === key)?.label === 'JoJo Moments' ? <WallOfJoyContent category={selectedCategory} onCreateMoment={onNavigateToCreateMoment} /> : <MyMomentsScreen category={selectedCategory} onCreateMoment={onNavigateToCreateMoment} />
          )}
        />
      </View>
    </View>
  );
}

const WallOfJoyContent = ({ category, onCreateMoment = () => { } }: { category: string, onCreateMoment: () => void }) => {
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useActiveMoments(category === 'All' ? '' : category);

  const queryClient = useQueryClient();
  const queryKey = ['activeMoments', category === 'All' ? '' : category];

  useEffect(() => {
    const handleMomentCreated = (payload: MomentEventPayload) => {
      console.log('⚡ Socket event: moment:created', payload);
      // Only add if category matches or we are in 'All'
      if (category !== 'All' && payload.category !== category) return;

      queryClient.setQueryData<InfiniteData<any>>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        const newPages = [...oldData.pages];
        // Add to the beginning of the first page
        if (newPages.length > 0) {
          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              moments: [payload, ...newPages[0].data.moments],
            },
          };
        }
        return {
          ...oldData,
          pages: newPages,
        };
      });
    };

    const handleMomentUpdated = (payload: MomentEventPayload | any) => {
      console.log('⚡ Socket event: moment:updated', payload);
      queryClient.setQueryData<InfiniteData<any>>(queryKey, (oldData) => {
        console.log(oldData, "oldData")
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              moments: page.data.moments.map((moment: any) =>
                moment._id === payload._id ? { ...moment, ...payload } : moment
              ),
            },
          })),
        };
      });
    };

    const handleMomentDeleted = (payload: MomentEventPayload) => {
      console.log('⚡ Socket event: moment:deleted', payload);
      queryClient.setQueryData<InfiniteData<any>>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              moments: page.data.moments.filter((moment: any) => moment._id !== payload.momentId),
            },
          })),
        };
      });
    };

    const handleHeartUpdated = (payload: MomentEventPayload) => {
      console.log('⚡ Socket event: moment:heart:updated', payload);
      queryClient.setQueryData<InfiniteData<any>>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              moments: page.data.moments.map((moment: any) =>
                moment._id === payload.momentId
                  ? { ...moment, hearts: payload.heartCount }
                  : moment
              ),
            },
          })),
        };
      });
    };

    socketService.on('moment:created', handleMomentCreated);
    socketService.on('moment:updated', handleMomentUpdated);
    socketService.on('moment:deleted', handleMomentDeleted);
    socketService.on('moment:heart:updated', handleHeartUpdated);

    return () => {
      socketService.off('moment:created', handleMomentCreated);
      socketService.off('moment:updated', handleMomentUpdated);
      socketService.off('moment:deleted', handleMomentDeleted);
      socketService.off('moment:heart:updated', handleHeartUpdated);
    };
  }, [queryClient, queryKey, category]);

  const { toggleHeart, loadingMomentId } = useMomentInteractions();

  const moments = data?.pages.flatMap(page => page.data.moments || []) || [];
  // const moments = data?.pages.flatMap(page => page.moments || []) || [];

  console.log(moments, "moments")

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

  if (moments.length === 0) {
    return (
      <NoMoments onCreateMoment={onCreateMoment} />
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: scale(14) }}>
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
          paddingVertical: verticalScale(0),
          paddingHorizontal: scale(8),
          paddingTop: verticalScale(10),
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
              isLoading={loadingMomentId === item._id}
              containerStyle={{
                height: 'auto',
                marginBottom: verticalScale(16),
              }}
            />
          );
        }}
      />

    </View>
  );
}
