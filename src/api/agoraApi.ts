import apiClient from './client';

export interface AgoraTokenResponse {
    success: boolean;
    token: string;
    appId: string;
    channelName: string;
    uid: number;
    expiresAt: string;
    expiresIn: number;
}

export const getAgoraToken = async (
    channelName: string,
    uid?: number
): Promise<AgoraTokenResponse> => {
    const params: any = { channelName };
    if (uid !== undefined) {
        params.uid = uid;
    }

    const response = await apiClient.get<AgoraTokenResponse>('/calls/agora-token', {
        params,
    });

    return response.data;
};
