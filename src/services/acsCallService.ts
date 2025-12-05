import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { ACSCallServiceType, CallStateChangedEvent, ParticipantJoinedEvent, RemoteVideoAddedEvent } from '../types/acs';

const { ACSCallModule } = NativeModules;

const eventEmitter = new NativeEventEmitter(ACSCallModule);

// Interface is now imported from ../types/acs


class ACSCallServiceImpl implements ACSCallServiceType {
    async init(token: string): Promise<boolean> {
        if (Platform.OS === 'android') {
            return ACSCallModule.init(token);
        }
        return false;
    }

    async startCall(calleeId: string): Promise<void> {
        if (Platform.OS === 'android') {
            return ACSCallModule.startCall(calleeId);
        }
    }

    async joinCall(callId: string, displayName: string): Promise<string> {
        if (Platform.OS === 'android') {
            return ACSCallModule.joinCall(callId, displayName);
        }
        return '';
    }

    async endCall(): Promise<boolean> {
        if (Platform.OS === 'android') {
            return ACSCallModule.endCall();
        }
        return false;
    }

    async toggleMic(isMuted: boolean): Promise<boolean> {
        if (Platform.OS === 'android') {
            return ACSCallModule.toggleMic(isMuted);
        }
        return false;
    }

    async toggleCamera(isCameraOn: boolean): Promise<boolean> {
        if (Platform.OS === 'android') {
            return ACSCallModule.toggleCamera(isCameraOn);
        }
        return false;
    }

    addListener(eventName: string, callback: (event: any) => void) {
        const subscription = eventEmitter.addListener(eventName, callback);
        return () => {
            subscription.remove();
        };
    }

    removeAllListeners(eventName: string) {
        eventEmitter.removeAllListeners(eventName);
    }
}

export const ACSCallService = new ACSCallServiceImpl();
