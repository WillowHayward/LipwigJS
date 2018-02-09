/**
 * @author: William Hayward
 */
import { EventManager } from './EventManager';
import { Host } from './Host';
import { Message } from './Types';

export class User extends EventManager {
    public id: string;
    private parent: Host;
    constructor(id: string, parent: Host) {
        super();
        this.id = id;
        this.parent = parent;
    }

    public send(event: string, ...args: any[]): void { // tslint:disable-line:no-any
        const message: Message = {
            event: event,
            data: args,
            sender: this.parent.id,
            recipient: [this.id]
        };
        this.parent.sendMessage(message);
    }
}
