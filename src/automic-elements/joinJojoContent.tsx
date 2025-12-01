import { View } from "react-native";
import { MainText } from "./text";
import LinearGradient from "react-native-linear-gradient";
import { lightTheme } from "../theme";
import { Text } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function JoinJojoContent() {
    return (
        <LinearGradient
            colors={lightTheme.colors.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                paddingVertical: verticalScale(10),
                paddingHorizontal: scale(20),
                borderRadius: scale(10),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: verticalScale(8),
                marginTop: verticalScale(5),
            }}
        >
            <Text variant="titleMedium" style={{ color: "#202123", fontSize: moderateScale(14), fontFamily: 'Poppins-SemiBold' }} numberOfLines={1} ellipsizeMode="tail">💫 Join JoJo to Create moments & Give Joy</Text>
            <Text variant="bodySmall" style={{ color: "#1D1E1F" }} numberOfLines={1} ellipsizeMode="tail">Sign up to connect with real people to add joy to their moments</Text>
        </LinearGradient>
    )
} 