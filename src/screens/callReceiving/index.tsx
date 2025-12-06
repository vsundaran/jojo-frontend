/**
 * CallReceivingScreen Component
 * 
 * A vertical drag slider interface for accepting or declining incoming calls.
 * 
 * Features:
 * - Single draggable button in the center
 * - Drag UP to accept the call
 * - Drag DOWN to decline the call
 * - Animated arrow hints that pulse and guide the user
 * - Smooth spring animations when releasing
 * - Follows app's existing style language
 * 
 * Props:
 * - navigation: Navigation object from React Navigation
 * - route: Route object containing params (callerName, category)
 * - onAccept?: Optional callback when call is accepted
 * - onDecline?: Optional callback when call is declined
 */

import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../../theme';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import Header from '../../automic-elements/header';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface RouteParams {
    category?: {
        title: string;
        primaryColor: string;
        borderColor: string;
        badgeColor: string;
        darkTextColor: string;
    };
    callerName?: string;
    callData?: any; // Add callData to route params
}

interface CallReceivingScreenProps {
    navigation?: NavigationProp<any>;
    route?: RouteProp<{ params: RouteParams }, 'params'>;
    onAccept?: () => void;
    onDecline?: () => void;
}

// ============================================================================
// CUSTOMIZABLE CONSTANTS
// ============================================================================

// Drag threshold: How far user must drag before action triggers (in pixels after scaling)
const DRAG_THRESHOLD = scale(50);

// Slider track height (visual reference, not enforced)
const SLIDER_TRACK_HEIGHT = verticalScale(200);

// Button size
const BUTTON_SIZE = scale(64);
const BUTTON_RADIUS = BUTTON_SIZE / 2;

// Arrow animation constants
const ARROW_PULSE_DISTANCE = scale(8); // How far arrows move during pulse
const ARROW_ANIMATION_DURATION = 1200; // Duration of one pulse cycle (ms)

// Colors (can be customized to match design)
const ACCEPT_COLOR = '#4CAF50'; // Green
const DECLINE_COLOR = '#F44336'; // Red
const TRACK_COLOR = 'rgba(150, 150, 150, 0.2)'; // Light gray track

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CallReceivingScreen({
    navigation: navProp,
    route: routeProp,
    onAccept,
    onDecline,
}: CallReceivingScreenProps = {}) {
    // Use hooks as fallback when props are not provided (React Navigation pattern)
    const navigationHook = useNavigation<any>();
    const routeHook = useRoute();

    const navigation = navProp || navigationHook;
    const route = routeProp || routeHook;

    const { category, callerName, callData } = (route.params as RouteParams) || {};

    // ========================================================================
    // ANIMATION VALUES
    // ========================================================================

    // Main drag position (Y-axis only) - uses useNativeDriver: false
    const pan = useRef(new Animated.ValueXY()).current;

    // Arrow animations (up and down) - uses useNativeDriver: true
    const arrowUpAnim = useRef(new Animated.Value(0)).current;
    const arrowDownAnim = useRef(new Animated.Value(0)).current;

    // Separate animated value for arrow opacity to avoid native driver conflict
    const arrowOpacityValue = useRef(new Animated.Value(1)).current;

    // Track whether user is currently dragging
    const isDragging = useRef(false);

    // ========================================================================
    // ARROW PULSE ANIMATIONS
    // ========================================================================

    useEffect(() => {
        // Create looping pulse animation for up arrows
        const upAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(arrowUpAnim, {
                    toValue: 1,
                    duration: ARROW_ANIMATION_DURATION / 2,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowUpAnim, {
                    toValue: 0,
                    duration: ARROW_ANIMATION_DURATION / 2,
                    useNativeDriver: true,
                }),
            ])
        );

        // Create looping pulse animation for down arrows (offset by half cycle)
        const downAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(arrowDownAnim, {
                    toValue: 1,
                    duration: ARROW_ANIMATION_DURATION / 2,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowDownAnim, {
                    toValue: 0,
                    duration: ARROW_ANIMATION_DURATION / 2,
                    useNativeDriver: true,
                }),
            ])
        );

        upAnimation.start();
        downAnimation.start();

        return () => {
            upAnimation.stop();
            downAnimation.stop();
        };
    }, [arrowUpAnim, arrowDownAnim]);

    // Interpolate arrow positions for smooth pulsing
    const arrowUpTranslateY = arrowUpAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -ARROW_PULSE_DISTANCE],
    });

    const arrowDownTranslateY = arrowDownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, ARROW_PULSE_DISTANCE],
    });

    // Fade arrows when dragging - using separate animated value to avoid native driver conflict
    // This is updated manually in the pan responder instead of using interpolation

    // ========================================================================
    // CALLBACKS
    // ========================================================================

    const handleAcceptCall = useCallback(() => {
        console.log('Call accepted');
        onAccept?.();
        // Navigate to video call screen
        console.log('callData on accept screen', callData);
        navigation.navigate('video-call', { callData: callData });
    }, [onAccept, navigation, callData]);

    const handleDeclineCall = useCallback(() => {
        console.log('Call declined');
        onDecline?.();
        navigation.goBack();
    }, [onDecline, navigation]);

    // ========================================================================
    // PAN RESPONDER (Drag Gesture Handler)
    // ========================================================================

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,

                onPanResponderGrant: () => {
                    isDragging.current = true;
                    // Extract current offset so dragging feels natural
                    pan.extractOffset();
                    // Start fading arrows
                    Animated.timing(arrowOpacityValue, {
                        toValue: 0.3,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                },

                onPanResponderMove: (_, gesture) => {
                    // Only allow vertical movement (Y-axis)
                    // Optionally add resistance when dragging too far
                    const resistance = 0.7; // Makes it harder to drag beyond threshold
                    let newY = gesture.dy;

                    if (Math.abs(gesture.dy) > DRAG_THRESHOLD) {
                        const excess = Math.abs(gesture.dy) - DRAG_THRESHOLD;
                        newY =
                            (DRAG_THRESHOLD + excess * resistance) *
                            Math.sign(gesture.dy);
                    }

                    pan.setValue({ x: 0, y: newY });
                },

                onPanResponderRelease: (_, gesture) => {
                    isDragging.current = false;
                    pan.flattenOffset();

                    // Restore arrow opacity
                    Animated.timing(arrowOpacityValue, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();

                    // Check if dragged past threshold
                    if (gesture.dy < -DRAG_THRESHOLD) {
                        // Dragged UP -> Accept
                        Animated.sequence([
                            // Animate button away
                            Animated.spring(pan, {
                                toValue: { x: 0, y: -DRAG_THRESHOLD * 1.8 },
                                useNativeDriver: false,
                                tension: 50,
                                friction: 7,
                            }),
                            // Reset to center
                            Animated.spring(pan, {
                                toValue: { x: 0, y: 0 },
                                useNativeDriver: false,
                                tension: 80,
                                friction: 8,
                            }),
                        ]).start(() => {
                            handleAcceptCall();
                        });
                    } else if (gesture.dy > DRAG_THRESHOLD) {
                        // Dragged DOWN -> Decline
                        Animated.sequence([
                            // Animate button away
                            Animated.spring(pan, {
                                toValue: { x: 0, y: DRAG_THRESHOLD * 1.8 },
                                useNativeDriver: false,
                                tension: 50,
                                friction: 7,
                            }),
                            // Reset to center
                            Animated.spring(pan, {
                                toValue: { x: 0, y: 0 },
                                useNativeDriver: false,
                                tension: 80,
                                friction: 8,
                            }),
                        ]).start(() => {
                            handleDeclineCall();
                        });
                    } else {
                        // Not dragged far enough -> Snap back to center
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: false,
                            tension: 80,
                            friction: 8,
                        }).start();
                    }
                },
            }),
        [pan, handleAcceptCall, handleDeclineCall]
    );

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
        <Container style={{ paddingTop: 0, paddingHorizontal: 0, padding: 0 }}>
            <Header />
            <LinearGradient
                colors={lightTheme.colors.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientContainer}
            >
                {/* Heart Icon with Circular Background */}
                <View style={styles.iconContainer}>
                    <View style={styles.outerCircle}>
                        <LinearGradient
                            colors={['#E9D4FF', '#FFE0E0', '#FFF0D0']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientCircle}
                        >
                            <View style={styles.innerCircle}>
                                <Image
                                    source={require('../../assets/loveHeart.png')}
                                    style={styles.heartIcon}
                                />
                            </View>
                        </LinearGradient>
                    </View>
                </View>

                {/* Caller Name */}
                <Text style={styles.callerText}>{callerName || 'JoJo'} calling</Text>

                {/* Slider Container */}
                <View style={styles.sliderContainer}>
                    {/* Accept Label */}
                    <Text style={styles.acceptText}>Accept</Text>

                    {/* Up Arrows (animated) */}
                    <Animated.View
                        style={[
                            styles.arrowContainer,
                            {
                                opacity: arrowOpacityValue,
                                transform: [{ translateY: arrowUpTranslateY }],
                            },
                        ]}
                    >
                        <Icon name="keyboard-arrow-up" size={scale(24)} color={ACCEPT_COLOR} />
                        <Icon
                            name="keyboard-arrow-up"
                            size={scale(24)}
                            color={ACCEPT_COLOR}
                            style={styles.arrowSpacing}
                        />
                        <Icon
                            name="keyboard-arrow-up"
                            size={scale(24)}
                            color={ACCEPT_COLOR}
                            style={styles.arrowSpacing}
                        />
                    </Animated.View>

                    {/* Vertical Track (visual guide) */}
                    <View style={styles.track} />

                    {/* Draggable Call Button */}
                    <Animated.View
                        style={[
                            styles.callButtonContainer,
                            {
                                transform: [{ translateY: pan.y }],
                            },
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.callButton}>
                            <Icon name="phone" size={scale(30)} color="#FFFFFF" />
                        </View>
                    </Animated.View>

                    {/* Down Arrows (animated) */}
                    <Animated.View
                        style={[
                            styles.arrowContainer,
                            {
                                opacity: arrowOpacityValue,
                                transform: [{ translateY: arrowDownTranslateY }],
                            },
                        ]}
                    >
                        <Icon
                            name="keyboard-arrow-down"
                            size={scale(24)}
                            color={DECLINE_COLOR}
                        />
                        <Icon
                            name="keyboard-arrow-down"
                            size={scale(24)}
                            color={DECLINE_COLOR}
                            style={styles.arrowSpacing}
                        />
                        <Icon
                            name="keyboard-arrow-down"
                            size={scale(24)}
                            color={DECLINE_COLOR}
                            style={styles.arrowSpacing}
                        />
                    </Animated.View>

                    {/* Decline Label */}
                    <Text style={styles.declineText}>Decline</Text>
                </View>
            </LinearGradient>
        </Container>
    );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(42),
    },

    // Heart icon styles (reused from CallInitiationScreen)
    iconContainer: {
        marginBottom: verticalScale(20),
    },
    outerCircle: {
        width: scale(140),
        height: scale(140),
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientCircle: {
        width: scale(140),
        height: scale(140),
        borderRadius: scale(70),
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(8),
    },
    innerCircle: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    heartIcon: {
        width: scale(54),
        height: scale(54),
        resizeMode: 'contain',
    },

    // Caller text
    callerText: {
        fontSize: scale(16),
        fontFamily: 'Poppins-Medium',
        color: lightTheme.colors.darkText,
        textAlign: 'center',
        marginBottom: verticalScale(30),
    },

    // Slider container
    sliderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: SLIDER_TRACK_HEIGHT + verticalScale(120), // Extra space for labels
    },

    // Vertical track (visual guide)
    track: {
        position: 'absolute',
        width: scale(4),
        height: SLIDER_TRACK_HEIGHT,
        backgroundColor: TRACK_COLOR,
        borderRadius: scale(2),
        top: '50%',
        marginTop: -SLIDER_TRACK_HEIGHT / 2,
    },

    // Accept/Decline labels
    acceptText: {
        fontSize: scale(18),
        fontFamily: 'Poppins-Bold',
        color: ACCEPT_COLOR,
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
    declineText: {
        fontSize: scale(18),
        fontFamily: 'Poppins-Bold',
        color: DECLINE_COLOR,
        textAlign: 'center',
        marginTop: verticalScale(12),
    },

    // Arrow containers
    arrowContainer: {
        alignItems: 'center',
        marginVertical: verticalScale(8),
    },
    arrowSpacing: {
        marginTop: -scale(8), // Overlap arrows slightly
    },

    // Call button (draggable)
    callButtonContainer: {
        position: 'absolute',
        zIndex: 10,
    },
    callButton: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_RADIUS,
        backgroundColor: '#5A5A5A', // Neutral dark gray
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
