import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LanguageSelectionModal from "../../automic-elements/languageSelectionModal";
import { useCompleteProfile } from "../../hooks/useAuthQuery";
import { useNavigation } from "@react-navigation/native";

export default function LanguageSelectionScreen({ isVisible, onClose, onComplete }: { isVisible?: boolean, onClose?: () => void, onComplete?: () => void }) {
    const [internalVisible, setInternalVisible] = useState(true);
    const visible = isVisible !== undefined ? isVisible : internalVisible;
    const completeProfileMutation = useCompleteProfile();
    const navigation = useNavigation<any>();

    return (
        <View style={{ flex: 1 }}>
            <LanguageSelectionModal
                visible={visible}
                isCompleting={completeProfileMutation.isPending || false}
                onComplete={(selectedLanguages) => {
                    const languages = selectedLanguages.map(lang => lang.name.toLowerCase());
                    completeProfileMutation.mutate(
                        { languages },
                        {
                            onSuccess: () => {
                                if (onComplete) {
                                    onComplete();
                                } else {
                                    setInternalVisible(false);
                                    navigation.navigate('app-layout');
                                }
                            },
                            onError: (error) => {
                                console.error("Failed to complete profile:", error);
                                // Optionally show an error message to the user
                            }
                        }
                    );
                }}
                onDismiss={() => {
                    if (onClose) {
                        onClose();
                    } else {
                        setInternalVisible(false);
                        navigation.navigate('app-layout');
                    }
                }}
            />
        </View>
    );
}