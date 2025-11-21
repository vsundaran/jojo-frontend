import { useMutation } from '@tanstack/react-query';
import { momentApi, CreateMomentRequest } from '../api/momentsApi';
import { ApiResponse, Moment } from '../types';

export const useCreateMoment = () => {
    return useMutation<ApiResponse<{ moment: Moment }>, Error, CreateMomentRequest>({
        mutationFn: (data: CreateMomentRequest) => momentApi.createMoment(data),
    });
};
