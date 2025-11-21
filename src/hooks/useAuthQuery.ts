import { useMutation } from '@tanstack/react-query';
import { authApi, SendOTPRequest, VerifyOTPRequest } from '../api/authApi';
import { ApiResponse } from '../types';

export const useSendOTP = () => {
    return useMutation({
        mutationFn: (data: SendOTPRequest) => authApi.sendOTP(data),
    });
};

export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: (data: VerifyOTPRequest) => authApi.verifyOTP(data),
    });
};

export const useCompleteProfile = () => {
    return useMutation({
        mutationFn: (data: { languages: string[] }) => authApi.completeProfile(data),
    });
};
