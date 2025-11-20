import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, Text, TouchableRipple } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../theme';

export interface TabItem {
    key: string;
    label: string;
    icon: ImageSourcePropType;
}

interface CustomTabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (key: string) => void;
    renderContent?: (activeTab: string) => React.ReactNode;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
    renderContent,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;

                    const TabContent = () => (
                        <View style={[styles.tabContent, isActive && styles.activeTabContent]}>
                            <Image
                                source={tab.icon}
                                style={[
                                    styles.icon,
                                    { tintColor: isActive ? lightTheme.colors.text : lightTheme.colors.textSecondary },
                                ]}
                                resizeMode="contain"
                            />
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: isActive ? lightTheme.colors.darkText : lightTheme.colors.darkText,
                                        fontWeight: isActive ? '600' : '400',
                                    },
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </View>
                    );

                    return (
                        <TouchableRipple
                            key={tab.key}
                            onPress={() => onTabChange(tab.key)}
                            style={[styles.tabButton, isActive && styles.activeTabButton]}
                            borderless={true}
                            rippleColor="rgba(0, 0, 0, 0.1)"
                        >
                            {isActive ? (
                                <LinearGradient
                                    colors={lightTheme.colors.gradientColors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientBackground}
                                >
                                    <TabContent />
                                </LinearGradient>
                            ) : (
                                <TabContent />
                            )}
                        </TouchableRipple>
                    );
                })}
            </View>
            {renderContent && <View style={styles.contentContainer}>{renderContent(activeTab)}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: lightTheme.colors.surface,
        borderRadius: scale(30),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        borderRadius: scale(24),
        overflow: 'hidden',
    },
    activeTabButton: {
        // Shadow for active tab if needed, but gradient usually suffices
    },
    gradientBackground: {
        flex: 1,
        borderRadius: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(8),
        gap: scale(8),

    },
    activeTabContent: {
        // specific styles for active content wrapper if needed
    },
    icon: {
        width: scale(20),
        height: scale(20),
    },
    label: {
        fontSize: scale(14),
    },
    contentContainer: {
    },
});

export default CustomTabs;
