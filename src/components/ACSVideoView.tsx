import React, { useEffect, useState } from 'react';
import { requireNativeComponent, ViewStyle, Platform, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ACSVideoViewProps {
    participantId: string; // 'local' or remote participant ID
    style?: ViewStyle;
}

const NativeACSVideoView = Platform.OS === 'android'
    ? requireNativeComponent<ACSVideoViewProps>('ACSVideoView')
    : View;

export const ACSVideoView: React.FC<ACSVideoViewProps> = ({ participantId, style }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        console.log(`[ACSVideoView] Rendering video for participant: ${participantId}`);

        // Reset loading state when participant changes
        setIsLoading(true);
        setHasError(false);

        // Give the native module time to attach the renderer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
            console.log(`[ACSVideoView] Cleanup for participant: ${participantId}`);
        };
    }, [participantId]);

    if (Platform.OS !== 'android') {
        return <View style={style} />;
    }

    return (
        <View style={[styles.container, style]}>
            <NativeACSVideoView
                key={`video-${participantId}-${Date.now()}`}
                participantId={participantId}
                style={styles.videoView}
            />
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>
                        {participantId === 'local' ? 'Starting camera...' : 'Waiting for video...'}
                    </Text>
                </View>
            )}
            {hasError && (
                <View style={styles.errorOverlay}>
                    <Text style={styles.errorText}>Video unavailable</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    videoView: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        marginTop: 10,
        fontSize: 14,
    },
    errorOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#FF5252',
        fontSize: 14,
    },
});
