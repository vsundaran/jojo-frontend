import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LanguageSelectionModal from "../../automic-elements/languageSelectionModal";

export default function LanguageSelectionScreen() {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={{ flex: 1 }}>
            <LanguageSelectionModal
                visible={modalVisible}
                onDismiss={() => setModalVisible(true)}
                onComplete={(selectedLanguages) => {
                    console.log('Selected:', selectedLanguages);
                    setModalVisible(false);
                }}
            />
        </View>
    );
}