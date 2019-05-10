/**
 * @author: William Hayward
 */
import { EventManager } from './EventManager';
import { Message } from './Types';
type FunctionMap = {
    [index: string]: Function;
};

export abstract class SocketUser extends EventManager {
    public id: string;
    protected reserved: FunctionMap;
    private socket: WebSocket;
    private retry: boolean;
    private url: string;
    constructor(url: string) {
        super();
        this.id = '';
        this.reserved = {};
        this.reserve('ping', this.pong);

        const cleanUrl: string = url.replace(/https?:\/\//, 'ws://');
        this.socket = new WebSocket(cleanUrl);
        this.retry = true;
        this.url = cleanUrl;
        this.addListeners();
    }

    public reconnect(socket: WebSocket): void {
        this.socket = socket;
        this.addListeners();
        const message: Message = {
            event: 'reconnect',
            data: [this.id],
            sender: this.id,
            recipient: []
        };
        this.sendMessage(message);
    }

    public sendMessage(message: Message): void {
        //TODO: Add in contingency system for messages sent during a disconnection
        //CONT: A queue of messages to be sent in bulk on resumption of connection
        if (message.sender.length === 0) {
            message.sender = this.id;
        }
        this.socket.send(JSON.stringify(message));
    }

    public ping(): void {
        const now: number = new Date().getTime();
        const message: Message = {
            event: 'lw-ping',
            data: [now],
            recipient: [],
            sender: ''
        };
        this.sendMessage(message);
    }

    protected setID(message: Message): boolean {
        this.id = message.data[0];
        this.deteReservation(message.event);

        return true;
    }

    protected abstract handle(event: MessageEvent): void;

    protected reserve(event: string, callback: Function): void {
        this.reserved[event] = callback.bind(this);
    }

    protected deteReservation(event: string): void {
        delete this.reserved[event];
    }

    protected abstract connected(): void;

    private addListeners(): void {
        this.socket.addEventListener('open', () => {
            this.emit('connected');
            this.connected();
        });
        this.socket.addEventListener('error', () => {
            // TODO: error handling
        });
        this.socket.addEventListener('message', (event: MessageEvent) => {
            this.handle(event);
        });
        this.socket.addEventListener('close', () => {
            if (this.retry) {
                this.autoReconnect();
            }
            // TODO: Connection close handling
        });
    }

    private autoReconnect(): void {
        const socket: WebSocket = new WebSocket(this.url);

        socket.addEventListener('error', (): void => {
            setTimeout(this.autoReconnect, 1000);
        });

        socket.addEventListener('open', (): void => {
            this.reconnect(socket);
        });
    }

    private pong(message: Message): boolean {
        const then: number = message.data[0];
        const now: number = new Date().getTime();
        const ping: number = now - then;
        this.emit('pong', ping);

        return false;
    }
}
