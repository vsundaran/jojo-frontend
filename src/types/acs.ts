export interface LocalVideoStream {
    source: {
        id: string;
        name: string;
        deviceType: string;
    };
    mediaStreamType: 'Video' | 'ScreenSharing';
}

export interface RemoteVideoStream {
    id: number;
    mediaStreamType: 'Video' | 'ScreenSharing';
    isAvailable: boolean;
}

export interface RemoteParticipant {
    identifier: {
        kind: 'communicationUser' | 'phoneNumber' | 'microsoftTeamsUser';
        communicationUserId?: string;
        phoneNumber?: string;
        microsoftTeamsUserId?: string;
    };
    displayName?: string;
    isMuted: boolean;
    isSpeaking: boolean;
    videoStreams: RemoteVideoStream[];
    state: 'Idle' | 'Connecting' | 'Connected' | 'Disconnected' | 'EarlyMedia' | 'Ringing' | 'Hold' | 'InLobby';
}

export type CallState = 'None' | 'EarlyMedia' | 'Incoming' | 'Connecting' | 'Ringing' | 'Connected' | 'LocalHold' | 'RemoteHold' | 'Disconnecting' | 'Disconnected';

export interface CallStateChangedEvent {
    state: CallState;
    callId: string;
}

export interface ParticipantJoinedEvent {
    participantId: string;
    displayName?: string;
}

export interface RemoteVideoAddedEvent {
    participantId: string;
    streamId: number;
    mediaStreamType: 'Video' | 'ScreenSharing';
}

export interface ACSCallServiceType {
    init(token: string): Promise<boolean>;
    startCall(calleeId: string): Promise<void>;
    joinCall(callId: string, displayName: string): Promise<string>;
    endCall(): Promise<boolean>;
    toggleMic(isMuted: boolean): Promise<boolean>;
    toggleCamera(isCameraOn: boolean): Promise<boolean>;
    addListener(eventName: 'onCallStateChanged', callback: (event: CallStateChangedEvent) => void): () => void;
    addListener(eventName: 'onParticipantJoined', callback: (event: ParticipantJoinedEvent) => void): () => void;
    addListener(eventName: 'onRemoteVideoAdded', callback: (event: RemoteVideoAddedEvent) => void): () => void;
    addListener(eventName: string, callback: (event: any) => void): () => void;
    removeAllListeners(eventName: string): void;
}
