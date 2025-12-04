export type MessageType = 'error' | 'success' | 'warning' | 'info';

export interface MessageOptions {
    type: MessageType;
    message: string;
    duration?: number;
}

class MessageService {
    private static showCallback: ((options: MessageOptions) => void) | null = null;

    static setRef(callback: (options: MessageOptions) => void) {
        this.showCallback = callback;
    }

    static showMessage(options: MessageOptions) {
        if (this.showCallback) {
            this.showCallback(options);
        } else {
            console.warn('MessageService not initialized. Message:', options);
        }
    }
}

export default MessageService;
