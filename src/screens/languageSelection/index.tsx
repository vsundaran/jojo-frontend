import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LanguageSelectionModal from "../../automic-elements/languageSelectionModal";

export default function LanguageSelectionScreen() {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View>
            <LanguageSelectionModal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                onComplete={(selectedLanguages) => {
                    console.log('Selected:', selectedLanguages);
                    setModalVisible(false);
                }}
            />
        </View>
    );
}