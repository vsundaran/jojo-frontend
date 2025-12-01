import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi, SendOTPRequest, VerifyOTPRequest } from '../api/authApi';
import { ApiResponse } from '../types';
import { loadAvailableLanguages, saveAvailableLanguages } from '../utils/languageUtils';

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

/**
 * Hook to fetch and cache available languages from the API
 * Uses local storage for offline access and caching
 */
export const useAvailableLanguages = () => {
    return useQuery({
        queryKey: ['availableLanguages'],
        queryFn: async () => {
            // Try to load from cache first
            const cached = await loadAvailableLanguages();
            if (cached.length > 0) {
                return cached;
            }

            // If no cache, fetch from API
            const response = await authApi.getAvailableLanguages();
            if (response.data.success && response.data.languages) {
                // Save to cache for future use
                await saveAvailableLanguages(response.data.languages);
                return response.data.languages;
            }

            return [];
        },
        staleTime: Infinity, // Master data rarely changes
        gcTime: Infinity, // Keep in cache indefinitely
    });
};
