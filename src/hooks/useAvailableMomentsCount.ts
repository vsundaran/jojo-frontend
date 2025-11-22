import { useQuery } from '@tanstack/react-query';
import { momentApi } from '../api/momentsApi';

export const useAvailableMomentsCount = () => {
    return useQuery({
        queryKey: ['availableMomentsCount'],
        queryFn: () => momentApi.getAvailableMomentsCount(),
    });
};
