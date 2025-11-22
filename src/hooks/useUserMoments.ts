import { useQuery } from '@tanstack/react-query';
import { momentApi } from '../api/momentsApi';

export const useUserMoments = (status?: string) => {
    return useQuery({
        queryKey: ['userMoments', status],
        queryFn: async () => {
            const response = await momentApi.getUserMoments(status);
            return response.data;
        },
    });
};
