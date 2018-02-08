/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';

export class Client extends SocketUser {
    constructor(url: string, code: string, data: object = {}) {
        super(url);
        this.reserved.created = this.setID;
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
}
