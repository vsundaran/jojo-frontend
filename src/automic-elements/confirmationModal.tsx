import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import CustomModal from './customModal';
import { lightTheme } from '../theme';
import { scale, verticalScale } from 'react-native-size-matters';

interface ConfirmationModalProps {
    visible: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    visible,
    onDismiss,
    onConfirm,
    title,
    content,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
}) => {
    return (
        <CustomModal visible={visible} onDismiss={onDismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="outlined"
                        onPress={onDismiss}
                        style={styles.button}
                        textColor={lightTheme.colors.text}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        mode="contained"
                        onPress={onConfirm}
                        style={styles.button}
                        buttonColor={lightTheme.colors.primary}
                    >
                        {confirmLabel}
                    </Button>
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: lightTheme.spacing.md,
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
        marginBottom: verticalScale(10),
        color: lightTheme.colors.text,
    },
    content: {
        fontSize: scale(14),
        textAlign: 'center',
        marginBottom: verticalScale(20),
        color: lightTheme.colors.text,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: scale(10),
    },
    button: {
        flex: 1,
    },
});

export default ConfirmationModal;
