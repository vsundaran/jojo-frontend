// src/services/api/wallOfJoyApi.ts

import { ApiResponse, Moment, User } from "../types";
import apiClient from "./client";
import { AxiosResponse } from "axios";

class WallOfJoyApi {
    async getActiveMoments(page: number = 1, limit: number = 20, category: string = ""): Promise<AxiosResponse<ApiResponse<{ moments: Moment[]; totalPages: number; currentPage: number; total: number }>>> {
        return apiClient.get(`/wall-of-joy/moments?page=${page}&limit=${limit}&category=${category}`);
    }

    async addHeart(momentId: string): Promise<ApiResponse<{ hearts: number }>> {
        return apiClient.post(`/wall-of-joy/moments/${momentId}/heart`, {});
    }

    async removeHeart(momentId: string): Promise<ApiResponse<{ hearts: number }>> {
        return apiClient.delete(`/wall-of-joy/moments/${momentId}/heart`);
    }
}

export const wallOfJoyApi = new WallOfJoyApi();