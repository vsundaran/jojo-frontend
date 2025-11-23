// src/services/api/momentApi.ts

import { ApiResponse, Moment, User } from "../types";
import apiClient from "./client";
import { AxiosResponse } from "axios";


export interface CreateMomentRequest {
    category: string;
    subCategory: string;
    content: string;
    languages: string[];
    scheduleType: 'immediate' | 'later';
    scheduledTime?: string;
    activeTime: number;
}

export interface UpdateMomentRequest {
    content?: string;
    languages?: string[];
    subCategory?: string;
}

export interface CategoryCount {
    _id: string;
    count: number;
}

export interface AvailableMomentsResponse {
    success: boolean;
    categoryCounts: CategoryCount[];
}

class MomentApi {
    async createMoment(data: CreateMomentRequest): Promise<ApiResponse<{ moment: Moment }>> {
        return apiClient.post('/moments', data);
    }

    async getUserMoments(status?: string, category?: string): Promise<ApiResponse<{ data: { moments: Moment[] } }>> {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (category && category !== 'All') params.append('category', category);

        const queryString = params.toString();
        const url = queryString ? `/moments?${queryString}` : '/moments';
        return apiClient.get(url);
    }

    async updateMoment(momentId: string, data: UpdateMomentRequest): Promise<ApiResponse<{ moment: Moment }>> {
        return apiClient.put(`/moments/${momentId}`, data);
    }

    async deleteMoment(momentId: string): Promise<ApiResponse> {
        return apiClient.delete(`/moments/${momentId}`);
    }

    async toggleMoment(momentId: string): Promise<ApiResponse> {
        return apiClient.patch(`/moments/${momentId}/toggle-pause`);
    }

    async getAvailableMoments(category?: string): Promise<AxiosResponse<ApiResponse<{ moments: Moment[] }>>> {
        const url = category ? `/moments/available?category=${category}` : '/moments/available';
        return apiClient.get(url);
    }

    async getAvailableMomentsCount(): Promise<AxiosResponse<AvailableMomentsResponse>> {
        return apiClient.get('/moments/available');
    }
}

export const momentApi = new MomentApi();