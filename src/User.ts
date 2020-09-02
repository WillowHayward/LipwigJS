/**
 * @author: William Hayward
 */
import { EventManager } from 'lipwig-events';
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

    public send(event: string, ...args: unknown[]): void {
      const message: Message = {
        event: event,
        data: args,
        sender: this.parent.id,
        recipient: [this.id]
      };
      this.parent.sendMessage(message);
    }

    public assign(name: string): void {
      this.parent.assign(this, name);
    }

    public unassign(name: string): void {
      this.parent.unassign(this, name);
    }

    public kick(reason = ''): void {
      this.send('kick', this.id, reason);
    }
}
