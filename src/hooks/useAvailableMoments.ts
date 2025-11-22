import { useQuery } from '@tanstack/react-query';
import { momentApi } from '../api/momentsApi';

export const useAvailableMoments = (category?: string) => {
    return useQuery({
        queryKey: ['availableMoments', category],
        queryFn: () => momentApi.getAvailableMoments(category),
    });
};
