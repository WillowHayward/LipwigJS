/**
 * @author: William Hayward
 */
import { EventManager } from './EventManager';
import { Message } from './Types';
type FunctionMap = {
    [index: string]: Function;
};

export abstract class SocketUser extends EventManager {
    protected id: string;
    protected reserved: FunctionMap;
    private socket: WebSocket;
    constructor(url: string) {
        super();
        this.id = '';
        this.reserved = {};
        this.socket = new WebSocket(url);
        this.socket.addEventListener('open', () => {
            this.emit('connected');
        });
        this.socket.addEventListener('error', () => {
            // TODO: error handling
        });
        this.socket.addEventListener('message', this.handle);
        this.socket.addEventListener('close', () => {
            // TODO: Connection close handling
        });
    }

    public sendMessage(message: Message): void {
        //TODO: Add in contingency system for messages sent during a disconnection
        //CONT: A queue of messages to be sent in bulk on resumption of connection
        message.sender = this.id;
        this.socket.send(message);
    }

    protected setID(message: Message): boolean {
        this.id = message.data[0];
        delete this.reserved[message.event]; // Only happens once

        return true;
    }

    protected handle(event: MessageEvent): void {
        const message: Message = JSON.parse(event.data);
        if (message.event in this.reserved) {
            if (!this.reserved[message.event](message)) {
                return;
            }
        }
        const args: any[] = [message.event].concat(message.data); // tslint:disable-line:no-any
        args.push(message);
        this.emit.apply(this, args);
    }
}
