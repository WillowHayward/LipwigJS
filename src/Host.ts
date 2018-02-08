/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';

export class Host extends SocketUser {
    constructor(url: string, options: object = {}) {
        super(url);
        this.reserved.created = this.setID;
    }
}
