import { useQuery } from '@tanstack/react-query';
import { momentApi } from '../api/momentsApi';

export const useUserMoments = (status?: string, category?: string) => {
    return useQuery({
        queryKey: ['userMoments', status, category],
        queryFn: async () => {
            const response = await momentApi.getUserMoments(status, category);
            return response.data;
        },
    });
};
