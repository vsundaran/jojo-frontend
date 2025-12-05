
import { ApiResponse, Call, User } from "../types";
import apiClient from "./client";

export interface InitiateCallRequest {
    category: string;
}

class CallApi {
    async initiateCall(data: InitiateCallRequest): Promise<ApiResponse<{ call: Call }>> {
        const response = await apiClient.post('/calls/initiate', data);
        return response.data;
    }

    async endCall(callId: string): Promise<ApiResponse<{ call: Call }>> {
        return apiClient.post(`/calls/${callId}/end`, {});
    }

    async getCallHistory(page: number = 1, limit: number = 10): Promise<ApiResponse<{ calls: Call[]; totalPages: number; currentPage: number; total: number }>> {
        return apiClient.get(`/calls/history?page=${page}&limit=${limit}`);
    }
}

export const callApi = new CallApi();