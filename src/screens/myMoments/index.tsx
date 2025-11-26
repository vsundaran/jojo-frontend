import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { lightTheme } from '../../theme';
import { MomentCard, MomentVariant } from './components/MomentCard';
import { NoMoments } from './NoMoments';
import { useUserMoments } from '../../hooks/useUserMoments';
import { momentApi } from '../../api/momentsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MOMENT_CATEGORIES } from '../../data/momentCategories';
import { useNavigation } from '@react-navigation/native';
import { Moment } from '../../types';
import { socketService, MomentEventPayload } from '../../services/socketService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../constants/StorageKeys';
import { scale, verticalScale } from 'react-native-size-matters';

export default function MyMomentsScreen({ onCreateMoment, category }: { onCreateMoment?: () => void, category?: string }) {
    const { data, isLoading, error, refetch } = useUserMoments(undefined, category);
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const queryKey = ['userMoments', undefined, category];

    useEffect(() => {
        let currentUserId: string | null = null;

        const fetchUserId = async () => {
            try {
                const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);
                if (userData) {
                    const parsed = JSON.parse(userData);
                    currentUserId = parsed._id || parsed.id;
                }
            } catch (e) {
                console.error('Failed to get user data', e);
            }
        };

        fetchUserId();

        const handleMomentCreated = (payload: MomentEventPayload) => {
            if (!currentUserId || payload.creatorId !== currentUserId) return;
            console.log('⚡ Socket event (MyMoments): moment:created', payload);

            // We need the full moment object to add it. The payload only has minimal info.
            // So for creation, it's safer to invalidate or refetch if we don't have the full object.
            // However, the user wants it to appear.
            // If the payload is just IDs, we can't display it.
            // Let's check the payload again.
            // Payload: { momentId, category, creatorId, timestamp }
            // It's missing content, etc.
            // So we MUST refetch or invalidate.
            queryClient.invalidateQueries({ queryKey: ['userMoments'] });
        };

        const handleMomentUpdated = (payload: MomentEventPayload) => {
            console.log('⚡ Socket event (MyMoments): moment:updated', payload);
            queryClient.setQueryData<any>(queryKey, (oldData: any) => {
                if (!oldData || !oldData.moments) return oldData;
                return {
                    ...oldData,
                    moments: oldData.moments.map((moment: Moment) =>
                        moment._id === payload.momentId ? { ...moment, ...payload } : moment
                    ),
                };
            });
        };

        const handleMomentDeleted = (payload: MomentEventPayload) => {
            console.log('⚡ Socket event (MyMoments): moment:deleted', payload);
            queryClient.setQueryData<any>(queryKey, (oldData: any) => {
                if (!oldData || !oldData.moments) return oldData;
                return {
                    ...oldData,
                    moments: oldData.moments.filter((moment: Moment) => moment._id !== payload.momentId),
                };
            });
        };

        const handleStatusChanged = (payload: MomentEventPayload) => {
            console.log('⚡ Socket event (MyMoments): moment:status:changed', payload);
            queryClient.setQueryData<any>(queryKey, (oldData: any) => {
                if (!oldData || !oldData.moments) return oldData;
                return {
                    ...oldData,
                    moments: oldData.moments.map((moment: Moment) =>
                        moment._id === payload.momentId ? { ...moment, status: payload.status } : moment
                    ),
                };
            });
        }

        const handleHeartUpdated = (payload: MomentEventPayload) => {
            console.log('⚡ Socket event (MyMoments): moment:heart:updated', payload);
            queryClient.setQueryData<any>(queryKey, (oldData: any) => {
                if (!oldData || !oldData.moments) return oldData;
                return {
                    ...oldData,
                    moments: oldData.moments.map((moment: Moment) =>
                        moment._id === payload.momentId ? { ...moment, hearts: payload.heartCount } : moment
                    ),
                };
            });
        }

        socketService.on('moment:created', handleMomentCreated);
        socketService.on('moment:updated', handleMomentUpdated);
        socketService.on('moment:deleted', handleMomentDeleted);
        socketService.on('moment:status:changed', handleStatusChanged);
        socketService.on('moment:heart:updated', handleHeartUpdated);

        return () => {
            socketService.off('moment:created', handleMomentCreated);
            socketService.off('moment:updated', handleMomentUpdated);
            socketService.off('moment:deleted', handleMomentDeleted);
            socketService.off('moment:status:changed', handleStatusChanged);
            socketService.off('moment:heart:updated', handleHeartUpdated);
        };
    }, [queryClient, queryKey, category]);

    const [togglingId, setTogglingId] = React.useState<string | null>(null);

    const toggleMutation = useMutation({
        mutationFn: (momentId: string) => momentApi.toggleMoment(momentId),
        onMutate: (momentId) => {
            setTogglingId(momentId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userMoments'] });
        },
        onSettled: () => {
            setTogglingId(null);
        }
    });

    const handleToggle = (momentId: string) => {
        toggleMutation.mutate(momentId);
    };

    const navigation = useNavigation<any>();

    const handleEdit = (moment: Moment) => {
        const category = MOMENT_CATEGORIES.find(c => c.id === moment.category.toLowerCase()) || MOMENT_CATEGORIES[0];
        navigation.navigate('app-layout', { screen: 'ChoosingSubCategory', params: { category: category, moment: moment }, timestamp: Date.now(), footerSlectedIndex: 1 });
    };

    const getCategoryVariant = (category: string): MomentVariant => {
        const categoryMap: Record<string, MomentVariant> = {
            wishes: 'Wishes',
            motivation: 'Motivation',
            songs: 'Song',
            blessings: 'Blessings',
            celebrations: 'Celebration',
        };
        return categoryMap[category.toLowerCase()] || 'Wishes';
    };

    if (isLoading && !refreshing) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={lightTheme.colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Failed to load moments</Text>
            </View>
        );
    }

    console.log(data, "data useUserMoments");

    const moments = data?.moments || [];

    if (moments.length === 0) {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <NoMoments onCreateMoment={onCreateMoment} />
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {moments.map((moment) => (
                    <MomentCard
                        key={moment._id}
                        title={getCategoryVariant(moment.category)}
                        subTag={moment.subCategory}
                        description={moment.content}
                        callCount={moment.callCount}
                        likeCount={moment.hearts}
                        isOn={moment.status === 'active'}
                        onToggle={() => handleToggle(moment._id)}
                        showToggle={moment.status !== 'expired'}
                        isLoading={togglingId === moment._id}
                        onEdit={() => handleEdit(moment)}
                        expiryDate={moment.expiresAt || ""}
                    />
                ))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(10),
        backgroundColor: lightTheme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: scale(14),
        paddingBottom: verticalScale(100),
        paddingTop: verticalScale(10),
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: lightTheme.colors.error,
    },
});
