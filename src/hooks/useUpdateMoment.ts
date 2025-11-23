import { useMutation, useQueryClient } from '@tanstack/react-query';
import { momentApi, UpdateMomentRequest } from '../api/momentsApi';
import { ApiResponse, Moment } from '../types';

export const useUpdateMoment = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<{ moment: Moment }>, Error, { momentId: string; data: UpdateMomentRequest }>({
        mutationFn: ({ momentId, data }) => momentApi.updateMoment(momentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userMoments'] });
        },
    });
};
