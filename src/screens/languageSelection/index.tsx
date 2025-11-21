import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LanguageSelectionModal from "../../automic-elements/languageSelectionModal";
import { useCompleteProfile } from "../../hooks/useAuthQuery";
import { useNavigation } from "@react-navigation/native";

export default function LanguageSelectionScreen() {
    const [modalVisible, setModalVisible] = useState(true);
    const completeProfileMutation = useCompleteProfile();
    const navigation = useNavigation<any>();

    return (
        <View style={{ flex: 1 }}>
            <LanguageSelectionModal
                visible={modalVisible}
                isCompleting={completeProfileMutation.isPending || false}
                onComplete={(selectedLanguages) => {
                    const languages = selectedLanguages.map(lang => lang.name.toLowerCase());
                    completeProfileMutation.mutate(
                        { languages },
                        {
                            onSuccess: () => {
                                setModalVisible(false);
                                navigation.navigate('app-layout');
                            },
                            onError: (error) => {
                                console.error("Failed to complete profile:", error);
                                // Optionally show an error message to the user
                            }
                        }
                    );
                }}
            />
        </View>
    );
}