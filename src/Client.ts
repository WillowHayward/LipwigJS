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
}
