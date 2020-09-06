/**
 * @author: William Hayward
 */
import { EventManager } from 'lipwig-events';
import { LipwigHost } from './LipwigHost';
import { LipwigLocalClient } from './LipwigLocalClient';
import { Message } from './Types';

export class User extends EventManager {
    public id: string;
    private parent: LipwigHost;
    public local: boolean;
    public client: LipwigLocalClient | undefined;
    constructor(id: string, parent: LipwigHost, local = false) {
      super();
      this.id = id;
      this.parent = parent;
      this.local = local;
    }

    public send(event: string, ...args: unknown[]): void {
      const message: Message = {
        event: event,
        data: args,
        sender: this.parent.id,
        recipient: [this.id]
      };

      if (this.local) {
        this.client?.handle(message);
      } else {
        this.parent.sendMessage(message);
      }
    }

    public assign(name: string): void {
      this.parent.assign(this, name);
    }

    public unassign(name: string): void {
      this.parent.unassign(this, name);
    }

    public kick(reason = ''): void {
      // TODO: For a local client this won't quite work I believe
      this.send('kick', this.id, reason);
    }
}
