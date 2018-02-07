/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
export class Client extends SocketUser {
    constructor(url: string, code: string, data: object = {}) {
        super(url);
        this.once('joined', (id: string) => {
            this.id = id;
        });
    }
}
