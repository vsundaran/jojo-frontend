import React from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '../theme';
import { scale } from 'react-native-size-matters';

interface CustomModalProps {
    visible: boolean;
    onDismiss: () => void;
    children: React.ReactNode;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onDismiss,
    children,
    contentContainerStyle,
}) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[styles.modalContainer, contentContainerStyle]}
                theme={{ colors: { backdrop: lightTheme.colors.modalBackground } }}
            >
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onDismiss}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name="close" size={scale(20)} color={lightTheme.colors.text} />
                    </TouchableOpacity>
                    {children}
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: lightTheme.colors.background,
        margin: lightTheme.spacing.lg,
        borderRadius: scale(24),
        padding: lightTheme.spacing.lg,
        alignSelf: 'center',
        width: '90%',
        maxWidth: 400,
    },
    content: {
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: -scale(10),
        right: -scale(10),
        padding: scale(5),
        zIndex: 1,
        backgroundColor: lightTheme.colors.nonActiveChip,
        borderRadius: scale(15),
    },
});

export default CustomModal;
