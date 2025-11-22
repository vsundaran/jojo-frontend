import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { lightTheme } from '../../theme';
import { MomentCard, MomentVariant } from './components/MomentCard';
import { NoMoments } from './NoMoments';
import { useUserMoments } from '../../hooks/useUserMoments';
import { momentApi } from '../../api/momentsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function MyMomentsScreen({ onCreateMoment, category }: { onCreateMoment?: () => void, category?: string }) {
    const { data, isLoading, error, refetch } = useUserMoments(undefined, category);
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

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
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
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
