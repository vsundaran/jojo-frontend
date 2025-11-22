import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wallOfJoyApi } from '../api/wallOfJoyApi';
import { Moment } from '../types';

export const useMomentInteractions = () => {
    const queryClient = useQueryClient();

    const [loadingMomentId, setLoadingMomentId] = useState<string | null>(null);

    const addHeartMutation = useMutation({
        mutationFn: (momentId: string) => wallOfJoyApi.addHeart(momentId),
        onMutate: async (momentId) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['activeMoments'] });

            // Snapshot the previous value
            const previousMoments = queryClient.getQueriesData({ queryKey: ['activeMoments'] });

            // Optimistically update to the new value
            queryClient.setQueriesData({ queryKey: ['activeMoments'] }, (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: {
                            ...page.data,
                            moments: page.data.moments.map((moment: Moment) => {
                                if (moment._id === momentId) {
                                    return {
                                        ...moment,
                                        hasHearted: true,
                                        hearts: (moment.hearts || 0) + 1,
                                    };
                                }
                                return moment;
                            }),
                        },
                    })),
                };
            });

            // Return a context object with the snapshotted value
            return { previousMoments };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousMoments) {
                context.previousMoments.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            setLoadingMomentId(null);
            queryClient.invalidateQueries({ queryKey: ['activeMoments'] });
        },
    });

    const removeHeartMutation = useMutation({
        mutationFn: (momentId: string) => wallOfJoyApi.removeHeart(momentId),
        onMutate: async (momentId) => {
            await queryClient.cancelQueries({ queryKey: ['activeMoments'] });

            const previousMoments = queryClient.getQueriesData({ queryKey: ['activeMoments'] });

            queryClient.setQueriesData({ queryKey: ['activeMoments'] }, (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: {
                            ...page.data,
                            moments: page.data.moments.map((moment: Moment) => {
                                if (moment._id === momentId) {
                                    return {
                                        ...moment,
                                        hasHearted: false,
                                        hearts: Math.max((moment.hearts || 0) - 1, 0),
                                    };
                                }
                                return moment;
                            }),
                        },
                    })),
                };
            });

            return { previousMoments };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousMoments) {
                context.previousMoments.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            setLoadingMomentId(null);
            queryClient.invalidateQueries({ queryKey: ['activeMoments'] });
        },
    });

    const toggleHeart = (momentId: string, isLiked: boolean) => {
        setLoadingMomentId(momentId);
        if (isLiked) {
            removeHeartMutation.mutate(momentId);
        } else {
            addHeartMutation.mutate(momentId);
        }
    };

    return {
        toggleHeart,
        isAddingHeart: addHeartMutation.isPending,
        isRemovingHeart: removeHeartMutation.isPending,
        loadingMomentId,
    };
};
