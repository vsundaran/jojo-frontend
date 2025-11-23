import io, { Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/StorageKeys';

// Define event types based on the backend service
export type MomentEventPayload = {
    momentId: string;
    category?: string;
    creatorId?: string;
    timestamp: number;
    heartCount?: number;
    status?: string;
};

class SocketService {
    private socket: Socket | null = null;
    private static instance: SocketService;
    private url: string = 'http://10.0.2.2:3000'; // Default Android emulator localhost

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public async initialize(): Promise<void> {
        if (this.socket?.connected) return;

        const token = await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN);

        this.socket = io(this.url, {
            auth: {
                token: token,
            },
            transports: ['websocket'],
            autoConnect: true,
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket connected:', this.socket?.id);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ Socket disconnected:', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.log('⚠️ Socket connection error:', error);
        });
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public on(event: string, callback: (data: any) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    public off(event: string, callback?: (data: any) => void): void {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    public emit(event: string, data: any): void {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    public getSocket(): Socket | null {
        return this.socket;
    }
}

export const socketService = SocketService.getInstance();
