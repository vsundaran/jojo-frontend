import { Text } from "react-native";
const TextAny = Text as any;
export default function setupText() {
    if (!TextAny.defaultProps) {
        TextAny.defaultProps = {};
    }
    TextAny.defaultProps.allowFontScaling = false;
    TextAny.defaultProps.style = [{ fontFamily: "Poppins-Regular" }];
}
