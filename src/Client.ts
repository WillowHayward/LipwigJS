/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';

export class Client extends SocketUser {
    private code: string;
    private data: object;
    constructor(url: string, code: string, data: object = {}) {
        super(url);
        this.reserve('joined', this.setID);
        this.code = code;
        this.data = data;
    }

    /**
     * Send a message to the host
     * @param event The event to send
     * @param args Arguments to send
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

    protected connected(): void {
        const message: Message = {
            event: 'join',
            data: [this.code, this.data],
            sender: '',
            recipient: []
        };
        this.sendMessage(message);
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
