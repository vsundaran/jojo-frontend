import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../../theme';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../automic-elements/header';

interface RouteParams {
    category: {
        title: string;
        primaryColor: string;
        borderColor: string;
        badgeColor: string;
        darkTextColor: string;
    };
}

export default function CallInitiationScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { category } = (route.params as RouteParams) || {};

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

                {/* Loading Text */}
                <Text style={styles.loadingText}>Locating a joyous moment...</Text>

                {/* Category Button */}
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        {
                            backgroundColor: category?.primaryColor || lightTheme.colors.wishesColor,
                            borderColor: category?.borderColor || lightTheme.colors.wishesBorderColor,
                        },
                    ]}
                    activeOpacity={0.8}
                >
                    <Text style={styles.categoryButtonText}>
                        {category?.title || 'Wishes'}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </Container>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(42),
    },
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
    loadingText: {
        fontSize: scale(16),
        fontFamily: 'Poppins-Medium',
        color: lightTheme.colors.darkText,
        textAlign: 'center',
        marginBottom: verticalScale(30),
    },
    categoryButton: {
        paddingHorizontal: scale(32),
        paddingVertical: scale(12),
        borderRadius: scale(25),
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryButtonText: {
        fontSize: scale(16),
        fontFamily: 'Poppins-SemiBold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
