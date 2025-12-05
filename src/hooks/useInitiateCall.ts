import { useMutation } from '@tanstack/react-query';
import { callApi, InitiateCallRequest } from '../api/callApi';
import { ApiResponse, Call } from '../types';

export const useInitiateCall = () => {
    return useMutation<ApiResponse<{ call: Call }>, Error, InitiateCallRequest>({
        mutationFn: (data: InitiateCallRequest) => callApi.initiateCall(data),
        retry: 3, // Total 4 attempts (1 initial + 3 retries)
        retryDelay: 2500, // 2.5 seconds delay between retries
    });
};
