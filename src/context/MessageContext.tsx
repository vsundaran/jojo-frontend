import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import MessageService, { MessageOptions, MessageType } from '../services/messageService';

interface MessageContextType {
    showMessage: (options: MessageOptions) => void;
    hideMessage: () => void;
    message: string | null;
    type: MessageType;
    visible: boolean;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<MessageType>('info');
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const hideMessage = useCallback(() => {
        setVisible(false);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
    }, [timer]);

    const showMessage = useCallback((options: MessageOptions) => {
        // Clear existing timer if any
        if (timer) {
            clearTimeout(timer);
        }

        setMessage(options.message);
        setType(options.type);
        setVisible(true);

        // Auto hide after duration (default 1500ms)
        const newTimer = setTimeout(() => {
            setVisible(false);
        }, options.duration || 1500);

        setTimer(newTimer);
    }, [timer]);

    // Register with global service
    useEffect(() => {
        MessageService.setRef(showMessage);
        return () => MessageService.setRef(() => { });
    }, [showMessage]);

    return (
        <MessageContext.Provider value={{ showMessage, hideMessage, message, type, visible }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};
