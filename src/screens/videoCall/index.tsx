import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, PermissionsAndroid, Platform, ActivityIndicator, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useRoute, useNavigation } from "@react-navigation/native";
import {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    IRtcEngine,
    RtcSurfaceView,
    RenderModeType,
    VideoSourceType,
} from 'react-native-agora';

import { Call } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useAgoraToken } from "../../hooks/useAgoraToken";

interface VideoCallScreenProps { }

export default function VideoCallScreen({ }: VideoCallScreenProps) {
    const route = useRoute();
    const navigation = useNavigation();
    const { callData } = (route.params as { callData: Call }) || {};
    console.log('useer callData', callData);
    const { user } = useAuth();

    const engineRef = useRef<IRtcEngine | null>(null);

    // State management
    const [isJoined, setIsJoined] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [remoteUid, setRemoteUid] = useState<number | null>(null);
    const [countdown, setCountdown] = useState(30);
    const [isInitializing, setIsInitializing] = useState(true);

    // Generate UID from user ID (simple hash to number)
    const generateUid = (userId: string): number => {
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = ((hash << 5) - hash) + userId.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    const uid = user ? generateUid(user.id) : 0;

    // Fetch Agora token
    const { data: tokenData, isLoading: isTokenLoading, error: tokenError } = useAgoraToken(
        callData?.agoraChannel || '',
        uid,
        !!callData?.agoraChannel
    );

    // Request permissions
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                if (
                    grants['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                    return true;
                } else {
                    console.log('Permissions denied');
                    Alert.alert('Permissions Required', 'Camera and microphone permissions are required for video calls.');
                    return false;
                }
            } catch (err) {
                console.warn('Permission error:', err);
                return false;
            }
        }
        return true;
    };

    // Initialize Agora Engine
    const initializeAgora = async () => {
        try {
            if (!tokenData?.appId) {
                console.log('Waiting for token data...');
                return;
            }

            console.log('Initializing Agora with App ID:', tokenData.appId);

            const engine = createAgoraRtcEngine();
            engine.initialize({ appId: tokenData.appId });
            engineRef.current = engine;

            // Enable video
            engine.enableVideo();

            // Set channel profile to communication (for 1-to-1 calls)
            engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);

            // Set client role to broadcaster (both users can send/receive)
            engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

            // Register event handlers
            engine.registerEventHandler({
                onJoinChannelSuccess: (connection, elapsed) => {
                    console.log('JoinChannelSuccess', connection.channelId, connection.localUid, elapsed);
                    setIsJoined(true);
                    setIsInitializing(false);
                },
                onUserJoined: (connection, remoteUid, elapsed) => {
                    console.log('UserJoined', remoteUid, elapsed);
                    setRemoteUid(remoteUid);
                },
                onUserOffline: (connection, remoteUid, reason) => {
                    console.log('UserOffline', remoteUid, reason);
                    setRemoteUid(null);
                },
                onError: (err, msg) => {
                    console.error('Agora Error:', err, msg);
                },
            });

            console.log('Agora engine initialized successfully');

            // Start local preview
            engine.startPreview();

        } catch (error) {
            console.error('Failed to initialize Agora:', error);
            Alert.alert('Error', 'Failed to initialize video call');
            setIsInitializing(false);
        }
    };

    // Join channel
    const joinChannel = async () => {
        try {
            if (!engineRef.current || !tokenData) {
                console.log('Engine or token not ready');
                return;
            }

            console.log('Joining channel:', tokenData.channelName, 'with UID:', uid);

            engineRef.current.joinChannel(
                tokenData.token,
                tokenData.channelName,
                uid,
                {
                    channelProfile: ChannelProfileType.ChannelProfileCommunication,
                    clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                    publishMicrophoneTrack: true,
                    publishCameraTrack: true,
                    autoSubscribeAudio: true,
                    autoSubscribeVideo: true,
                }
            );

            console.log('Join channel request sent');
        } catch (error) {
            console.error('Failed to join channel:', error);
            Alert.alert('Error', 'Failed to join video call');
            setIsInitializing(false);
        }
    };

    // Leave channel and cleanup
    const leaveChannel = async () => {
        try {
            if (engineRef.current) {
                engineRef.current.leaveChannel();
                engineRef.current.release();
                engineRef.current = null;
            }
            navigation.goBack();
        } catch (error) {
            console.error('Failed to leave channel:', error);
            navigation.goBack();
        }
    };

    // Toggle microphone
    const toggleMute = async () => {
        if (engineRef.current) {
            engineRef.current.muteLocalAudioStream(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    // Toggle camera
    const toggleVideo = async () => {
        if (engineRef.current) {
            engineRef.current.muteLocalVideoStream(!isVideoEnabled);
            setIsVideoEnabled(!isVideoEnabled);
        }
    };

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) {
            leaveChannel();
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    // Initialize on mount
    useEffect(() => {
        const setup = async () => {
            const hasPermissions = await requestPermissions();
            if (!hasPermissions) {
                navigation.goBack();
                return;
            }
        };

        setup();

        return () => {
            // Cleanup on unmount
            if (engineRef.current) {
                engineRef.current.leaveChannel();
                engineRef.current.release();
            }
        };
    }, []);

    // Initialize Agora when token is ready
    useEffect(() => {
        if (tokenData && !engineRef.current) {
            initializeAgora();
        }
    }, [tokenData]);

    // Join channel when engine is ready
    useEffect(() => {
        if (engineRef.current && tokenData && !isJoined) {
            joinChannel();
        }
    }, [engineRef.current, tokenData, isJoined]);

    // Log call data
    useEffect(() => {
        if (callData) {
            console.log("VideoCallScreen received call data:", callData.callId);
            console.log("Agora channel:", callData.agoraChannel);
        }
    }, [callData]);

    // Handle token error
    useEffect(() => {
        if (tokenError) {
            console.error('Token error:', tokenError);
            Alert.alert('Error', 'Failed to get video call token');
            navigation.goBack();
        }
    }, [tokenError]);

    const formatCountdown = (seconds: number): string => {
        if (seconds < 0) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Show loading state
    if (isTokenLoading || isInitializing) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#414042" />
                <ActivityIndicator size="large" color="#FF9800" />
                <Text style={styles.loadingText}>Connecting to call...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#414042" />

            {/* Top Bar */}
            <View style={styles.topBar}>
                {/* Countdown Timer */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{formatCountdown(countdown)}</Text>
                </View>
            </View>

            {/* Video Views */}
            <View style={styles.videoContainer}>
                {/* Remote Video (Full Screen) */}
                {remoteUid ? (
                    <RtcSurfaceView
                        style={styles.remoteVideo}
                        canvas={{
                            uid: remoteUid,
                            renderMode: RenderModeType.RenderModeHidden,
                        }}
                    />
                ) : (
                    <View style={styles.videoPlaceholder}>
                        <Icon name="person" size={140} color="#999" />
                        <Text style={styles.waitingText}>Waiting for other user...</Text>
                    </View>
                )}

                {/* Local Video (Floating) */}
                {isVideoEnabled && (
                    <View style={styles.localVideoContainer}>
                        <RtcSurfaceView
                            style={styles.localVideo}
                            canvas={{
                                uid: 0, // 0 means local user
                                renderMode: RenderModeType.RenderModeHidden,
                                sourceType: VideoSourceType.VideoSourceCamera,
                            }}
                            zOrderMediaOverlay={true}
                        />
                    </View>
                )}
            </View>

            {/* Bottom Control Bar */}
            <View style={styles.bottomControlBar}>
                {/* Microphone Button */}
                <TouchableOpacity
                    style={[styles.controlButton, isMuted && styles.mutedButton]}
                    onPress={toggleMute}
                >
                    <Icon name={isMuted ? "mic-off" : "mic"} size={28} color={isMuted ? "#FFF" : "#414042"} />
                </TouchableOpacity>

                {/* Call End Button (Red) */}
                <TouchableOpacity
                    style={[styles.controlButton, styles.callEndButton]}
                    onPress={leaveChannel}
                >
                    <Icon name="call-end" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Video Camera Button */}
                <TouchableOpacity
                    style={[styles.controlButton, !isVideoEnabled && styles.mutedButton]}
                    onPress={toggleVideo}
                >
                    <Icon name={isVideoEnabled ? "videocam" : "videocam-off"} size={28} color={!isVideoEnabled ? "#FFF" : "#414042"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#414042',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#414042',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: verticalScale(20),
        fontSize: scale(16),
        color: '#FFFFFF',
        fontFamily: 'Poppins-Regular',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(50),
        paddingHorizontal: scale(20),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    timerContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(8),
        borderRadius: scale(20),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    timerText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: '#FF9800',
        fontFamily: 'Poppins-SemiBold',
    },
    videoContainer: {
        flex: 1,
        position: 'relative',
    },
    remoteVideo: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoPlaceholder: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    waitingText: {
        marginTop: verticalScale(20),
        fontSize: scale(16),
        color: '#666',
        fontFamily: 'Poppins-Regular',
    },
    localVideoContainer: {
        position: 'absolute',
        top: verticalScale(100),
        right: scale(20),
        width: scale(120),
        height: verticalScale(160),
        borderRadius: scale(12),
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: '#000', // Ensure backround is black for video
    },
    localVideo: {
        flex: 1,
    },
    bottomControlBar: {
        borderTopLeftRadius: scale(30),
        borderTopRightRadius: scale(30),
        paddingVertical: verticalScale(25),
        paddingHorizontal: scale(40),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#414042',
    },
    controlButton: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    callEndButton: {
        backgroundColor: '#E53935',
    },
    mutedButton: {
        backgroundColor: '#666',
    },
});
