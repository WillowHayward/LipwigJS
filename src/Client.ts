/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';

export class Client extends SocketUser {
    private code: string;
    private data: object;
    
    /**
     * Attempt to join an existing Lipwig room
     * @param url   Websocket url of LipwigCore server
     * @param code  Room code to attempt to join
     * @param data  Data to pass to room host on connection
     */
    constructor(url: string, code: string, data: object = {}) {
        super(url);
        this.reserve('joined', this.setID);
        this.code = code;
        this.data = data;
    }

    /**
     * Send a message to the host
     * @param event The event name
     * @param args  Arguments to send
     */
    public send(event: string, ...args: any[]): void { // tslint:disable-line:no-any
        const message: Message = {
            event: event,
            data: args,
            sender: this.id,
            recipient: []
        };
        this.sendMessage(message);
    }

    /**
     * Final stage of connection handshake - sends join message to LipwigCore server
     */
    protected connected(): void {
        const message: Message = {
            event: 'join',
            data: [this.code, this.data],
            sender: '',
            recipient: []
        };
        this.sendMessage(message);
    }

    /**
     * Handle received message
     * @param event 
     */
    protected handle(event: MessageEvent): void {
        const message: Message = JSON.parse(event.data);
        if (message.event in this.reserved) {

            // Reserved message functions return false if they're blocking
            if (!this.reserved[message.event](message)) {
                return;
            }
        }
        const args: any[] = [message.event].concat(message.data); // tslint:disable-line:no-any
        args.push(message);
        this.emit.apply(this, args);
    }
}
