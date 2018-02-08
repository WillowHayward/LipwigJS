/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';
import { User } from './User';

type UserMap = {
    [index: string]: User;
};

export class Host extends SocketUser {
    private users: UserMap;
    constructor(url: string, options: object = {}) {
        super(url);
        this.reserved.created = this.setID;
        this.reserved.joined = this.joined;

        this.users = {};
    }

    protected handle(event: MessageEvent): void {
        super.handle(event);
        const message: Message = JSON.parse(event.data);
        if (message.sender in this.users) {
            const user: User = this.users[message.sender];
            const args: any[] = [message.event].concat(message.data); // tslint:disable-line:no-any
            args.push(message);
            user.emit.apply(user, args);
        }
    }

    private joined(message: Message): boolean {
        const userID: string = message.data[0];
        const user: User = new User(userID, this);
        this.emit('joined', user, message);

        return false; // Block second emit
    }
}
