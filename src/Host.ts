/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
export class Host extends SocketUser {
    constructor(url: string, options: object = {}) {
        super(url);
        this.once('created', (id: string) => {
            this.id = id;
        });
    }
}
