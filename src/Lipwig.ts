/**
 * @author: William Hayward
 */
import { EventManager } from './EventManager';

type Message = {
    event: string;
    data: any; // tslint:disable-line:no-any
    recipient: string[];
    sender: string;
};

export class Lipwig extends EventManager {
    private socket: WebSocket;
    constructor(url: string) {
        super();
        this.socket = new WebSocket(url);
        this.socket.onopen = (): void => {
            this.emit('connected');
        };
        this.socket.onmessage = this.handle;
    }

    private handle(event: MessageEvent): void {
        const message: Message = JSON.parse(event.data);
        const args: any[] = [message.event].concat(message.data); // tslint:disable-line:no-any
        this.emit.apply(this, args);
    }
}
