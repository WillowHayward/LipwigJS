/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';

export class Client extends SocketUser {
    private code: string;
    constructor(url: string, code: string, data: object = {}) {
        super(url);
        this.reserve('joined', this.setID);
        this.code = code;
    }

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
            data: [this.code],
            sender: '',
            recipient: []
        };
        this.sendMessage(message);
    }
}
