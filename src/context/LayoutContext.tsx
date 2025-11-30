import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

interface LayoutContextType {
    setControlsVisible: (visible: boolean) => void;
    controlsVisible: boolean;
    visibilityValue: Animated.Value; // 0 for hidden, 1 for visible
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [controlsVisible, setControlsVisible] = useState(true);
    const visibilityValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(visibilityValue, {
            toValue: controlsVisible ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
        }).start();
    }, [controlsVisible]);

    return (
        <LayoutContext.Provider value={{ setControlsVisible, controlsVisible, visibilityValue }}>
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
