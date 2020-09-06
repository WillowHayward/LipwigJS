
/**
 * @author: William Hayward
 */
import { EventManager } from 'lipwig-events';
import { User } from './User';
import { LipwigHost } from './LipwigHost';
import { Message, DataMap } from './Types';

export class LipwigLocalClient extends EventManager {
  public id: string;
  private reserved: EventManager;
  private parent: LipwigHost;
  public data: DataMap;
  private user: User;
  constructor(parent: LipwigHost, user: User, data: DataMap = {}) {
    super();
    this.id = '';
    this.parent = parent;
    this.user = user;
    this.data = data;
    this.reserved = new EventManager();
    this.reserved.on('joined', this.setID, {object: this});
  }

  public send(event: string, ...args: unknown[]): void {
    this.parent.emit(event, this.user, ...args);
  }

  public handle(message: Message): void {
    // In theory this should never be from a socket
    const args: unknown[] = message.data.concat(message);

    this.reserved.emit(message.event, ...args);
    this.emit(message.event, ...args);
  }

  private setID(id: string): void {
    this.id = id;
  }
}
