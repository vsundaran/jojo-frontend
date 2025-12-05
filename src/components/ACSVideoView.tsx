import React from 'react';
import { requireNativeComponent, ViewStyle, Platform, View } from 'react-native';

interface ACSVideoViewProps {
    participantId: string; // 'local' or remote participant ID
    style?: ViewStyle;
}

const NativeACSVideoView = Platform.OS === 'android'
    ? requireNativeComponent<ACSVideoViewProps>('ACSVideoView')
    : View;

export const ACSVideoView: React.FC<ACSVideoViewProps> = ({ participantId, style }) => {
    if (Platform.OS !== 'android') {
        return <View style={style} />;
    }
    return <NativeACSVideoView participantId={participantId} style={style} />;
};
