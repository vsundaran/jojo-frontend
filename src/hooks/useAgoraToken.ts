import { useQuery } from '@tanstack/react-query';
import { getAgoraToken, AgoraTokenResponse } from '../api/agoraApi';

export const useAgoraToken = (channelName: string, uid?: number, enabled: boolean = true) => {
    return useQuery<AgoraTokenResponse>({
        queryKey: ['agoraToken', channelName, uid],
        queryFn: () => getAgoraToken(channelName, uid),
        enabled: enabled && !!channelName,
        staleTime: 1000 * 60 * 60, // 1 hour (token is valid for 24 hours)
        retry: 2,
    });
};
