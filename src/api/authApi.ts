import { AxiosResponse } from "axios";
import { ApiResponse, User } from "../types";
import apiClient from "./client";

export interface SendOTPRequest {
    mobileNumber: string;
}

export interface VerifyOTPRequest {
    mobileNumber: string;
    otp: string;
    name?: string;
}

export interface CompleteProfileRequest {
    languages: string[];
}

class AuthApi {
    async sendOTP(data: SendOTPRequest): Promise<AxiosResponse<ApiResponse<{ isNewUser: boolean }>>> {
        return apiClient.post('/auth/send-otp', data);
    }

    async verifyOTP(data: VerifyOTPRequest): Promise<AxiosResponse<ApiResponse<{ user: User; token: string; profileCompleted: boolean }>>> {
        return apiClient.post('/auth/verify-otp', data);
    }

    async completeProfile(data: CompleteProfileRequest): Promise<AxiosResponse<ApiResponse<{ user: User }>>> {
        return apiClient.post('/auth/complete-profile', data);
    }

    async logout(): Promise<void> {
        // Clear local storage is handled in context
        return Promise.resolve();
    }
}

export const authApi = new AuthApi();