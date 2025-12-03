import React, { createContext, useContext, useRef } from 'react';
import { Animated, Platform } from 'react-native';

interface LayoutContextType {
    scrollY: Animated.Value;
    headerTranslateY: Animated.AnimatedInterpolation<number>;
    footerTranslateY: Animated.AnimatedInterpolation<number>;
    headerHeight: number;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 180; // Approximate height of header + category + tabs. Adjust as needed.

    // diffClamp tracks the scroll delta but clamps it within a range.
    // We want to hide the header (move it up by headerHeight) when scrolling down,
    // and show it (move it down to 0) when scrolling up.
    const headerDiffClamp = Animated.diffClamp(scrollY, 0, headerHeight);

    const footerHeight = Platform.select({
        ios: 120,
        android: 80,
        default: 115,
    });

    const footerTranslateY = headerDiffClamp.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, footerHeight],
    });

    return (
        <LayoutContext.Provider value={{ scrollY, headerTranslateY: headerDiffClamp.interpolate({ inputRange: [0, headerHeight], outputRange: [0, -headerHeight] }), footerTranslateY, headerHeight }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};
