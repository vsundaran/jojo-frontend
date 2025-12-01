import React, { useState, useEffect } from 'react';
import { View, RefreshControl, FlatList, Animated } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { lightTheme } from '../../theme';
import ScrollingCategory from './scrollingCategory';
import { WishCard } from '../../automic-elements/wishCard';
import CustomTabs from '../../automic-elements/customTabs';
import MyMomentsScreen from '../myMoments';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useActiveMoments } from '../../hooks/useActiveMoments';
import { useMomentInteractions } from '../../hooks/useMomentInteractions';
import { MOMENT_CATEGORIES, Category } from '../../data/momentCategories';
import { ActivityIndicator } from 'react-native-paper';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { socketService, MomentEventPayload } from '../../services/socketService';
import { useAuth } from '../../context/AuthContext';
import { NoMoments } from '../myMoments/NoMoments';

import { useLayout } from '../../context/LayoutContext';
import JoinJojoContent from '../../automic-elements/joinJojoContent';

export default function WallOfJoyScreen({ route, initialTab, timestamp, onNavigateToCreateMoment, onLoginRequest }: any) {
  const [activeTab, setActiveTab] = useState(initialTab || route?.params?.initialTab || '1');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { scrollY, headerTranslateY, headerHeight } = useLayout();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, timestamp]);

  const tabs: any[] = [
    { key: '1', label: 'JoJo Moments', icon: 'creation' },
    { key: '2', label: 'My Moments', icon: 'account' },
  ];

  const { user } = useAuth();

  const contentPaddingTop = user ? verticalScale(180) : verticalScale(130);

  return (
    <View style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: scale(6) }}>
        {!user ? (
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                transform: [{ translateY: headerTranslateY }],
                zIndex: 10,
                backgroundColor: lightTheme.colors.background,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                paddingTop: verticalScale(55), // Adjust as needed
              }}
            >
              <View style={{ paddingVertical: verticalScale(3), justifyContent: 'center', alignItems: 'center' }}>
                <ScrollingCategory
                  activeCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </View>
              <View style={{ marginBottom: verticalScale(4) }}>
                <Divider />
              </View>
            </Animated.View>
            <WallOfJoyContent
              category={selectedCategory}
              onCreateMoment={onNavigateToCreateMoment}
              onLoginRequest={onLoginRequest}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              contentContainerStyle={{ paddingTop: contentPaddingTop }}
            />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                transform: [{ translateY: headerTranslateY }],
                zIndex: 10,
                backgroundColor: lightTheme.colors.background,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                paddingTop: verticalScale(55),
              }}
            >
              <View style={{ paddingVertical: verticalScale(3), justifyContent: 'center', alignItems: 'center' }}>
                <ScrollingCategory
                  activeCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </View>
              <View style={{ marginBottom: verticalScale(4) }}>
                <Divider />
              </View>
              <CustomTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              // We don't need visibilityValue here anymore as we handle animation in parent
              // But CustomTabs expects it, so we might need to refactor CustomTabs or pass null
              />
            </Animated.View>

            {/* Content needs to be padded by headerHeight via contentContainerStyle */}
            <View style={{ flex: 1 }}>
              {tabs.find((t) => t.key === activeTab)?.label === 'JoJo Moments' ?
                <WallOfJoyContent
                  category={selectedCategory}
                  onCreateMoment={onNavigateToCreateMoment}
                  onLoginRequest={onLoginRequest}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                  )}
                  contentContainerStyle={{ paddingTop: contentPaddingTop }}
                /> :
                <MyMomentsScreen
                  category={selectedCategory}
                  onCreateMoment={onNavigateToCreateMoment}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                  )}
                  contentContainerStyle={{ paddingTop: contentPaddingTop }}
                />
              }
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const WallOfJoyContent = ({ category, onCreateMoment = () => { }, onLoginRequest, onScroll, contentContainerStyle }: { category: string, onCreateMoment: () => void, onLoginRequest?: () => void, onScroll?: (event: any) => void, contentContainerStyle?: any }) => {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useActiveMoments(category === 'All' ? '' : category);

  const queryClient = useQueryClient();
  const queryKey = ['activeMoments', category === 'All' ? '' : category];

  useEffect(() => {
    const handleMomentCreated = (payload: MomentEventPayload) => {
      if (category !== 'All' && payload.category !== category) return;

      queryClient.setQueryData<InfiniteData<any>>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        const newPages = [...oldData.pages];
        if (newPages.length > 0) {
          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              moments: [payload, ...newPages[0].data.moments],
            },
          };
        }
        return { ...oldData, pages: newPages };
      });
    };

    const handleMomentUpdated = (payload: MomentEventPayload | any) => {
      queryClient.setQueryData<InfiniteData<any>>(queryKey, (oldData) => {
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

  const { toggleHeart } = useMomentInteractions();
  const moments = data?.pages.flatMap(page => page.data.moments || []) || [];

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
      <View style={{ flex: 1, paddingHorizontal: scale(14), paddingTop: verticalScale(100) }}>
        <NoMoments onCreateMoment={onCreateMoment} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: scale(14) }}>
      <Animated.FlatList
        data={moments}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        keyExtractor={(item: any, index) => item._id || index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            colors={[lightTheme.colors.primary]}
            tintColor={lightTheme.colors.primary}
          />
        }
        contentContainerStyle={[{
          paddingBottom: verticalScale(130),
          paddingHorizontal: scale(8),
        }, contentContainerStyle]}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}

        ListHeaderComponent={user ? null : <JoinJojoContent />}

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
        renderItem={({ item }) => {
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
              onLikePress={() => {
                if (!user) {
                  if (onLoginRequest) onLoginRequest();
                } else {
                  toggleHeart(item._id, item.hasHearted || false);
                }
              }}
              onCallPress={() => console.log('Call pressed')}
              onTagPress={tag => console.log(`Tag pressed: ${tag}`)}
              primaryColor={primaryColor}
              borderColor={borderColor}
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
