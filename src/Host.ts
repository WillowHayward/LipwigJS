/**
 * @author: William Hayward
 */
import { SocketUser } from './SocketUser';
import { Message } from './Types';
import { User } from './User';

type UserMap = {
    [index: string]: User;
};

type GroupMap = {
    [index: string]: User[];
};

type Filter = {
    whitelist: string[];
    blacklist: string[];
};

export class Host extends SocketUser {
    private users: UserMap;
    private groups: GroupMap;
    constructor(url: string, options: object = {}) {
        super(url);
        this.reserve('created', this.created);
        this.reserve('joined', this.joined);
        this.reserve('reconnected', (): boolean => {
            this.emit('reconnected');

            return false;
        });

        this.users = {};
        this.groups = {};
    }

    public getUsers(): UserMap {
        return this.users; // TODO: This is returning a reference to the original object
    }

    public close(reason: string): void {
        const message: Message = {
            event: 'close',
            data: [reason],
            recipient: [],
            sender: this.id
        };

        this.sendMessage(message);
    }

    public assign(user: User, name: string): void {
        let group: User[] = this.groups[name];
        if (group === undefined) {
            this.groups[name] = [];
            group = this.groups[name];
        }

        if (group.indexOf(user) !== -1) {
            // Already in group
            return;
        }

        group.push(user);
        user.send('assigned', name);
    }

    public unassign(user: User, name: string): void {
        const group: User[] = this.groups[name];
        if (group === undefined) {
            return;
        }

        const position: number = group.indexOf(user);
        if (position === -1) {
            // Not in group
            return;
        }

        this.groups[name] = group.splice(position, 1);
        user.send('unassigned', name);
    }

    public getGroup(name: string): User[] {
        const group: User[] = this.groups[name];
        if (group === undefined) {
            return [];
        }

        return group;
    }

    public send(message: string, filter: Filter, ...args: any[]): void { // tslint:disable-line:no-any
        let users: User[] = [];
        if (filter.whitelist === undefined) {
            filter.whitelist = [];
        }

        users = this.filter(filter.whitelist, true);

        if (filter.blacklist === undefined) {
            filter.blacklist = [];
        }

        const blacklist: User[] = this.filter(filter.blacklist, false);

        const finalArgs: any[] = [message].concat(args); // tslint:disable-line:no-any
        users.forEach((user: User): void => {
            if (blacklist.indexOf(user) > -1) {
                return;
            }
            user.send.apply(user, finalArgs);
        });
    }

    protected handle(event: MessageEvent): void {
        const message: Message = JSON.parse(event.data);
        if (message.event in this.reserved) {
            if (!this.reserved[message.event](message)) {
                return;
            }
        }

        const args: any[] = [message.event].concat(message.data); // tslint:disable-line:no-any
        if (message.sender in this.users) {
            const user: User = this.users[message.sender];
            args.push(message);
            user.emit.apply(user, args);
            args.splice(1, 0, user);
        }
        this.emit.apply(this, args);
    }

    protected connected(): void {
        const message: Message = {
            event: 'create',
            data: [],
            sender: '',
            recipient: []
        };
        this.sendMessage(message);
    }

    private created(message: Message): boolean {
        this.setID(message); // Also deleted reserved event

        const id: string = message.data[0];
        this.emit('created', id);

        return false;
    }

    private joined(message: Message): boolean {
        const userID: string = message.data[0];
        const user: User = new User(userID, this);
        this.users[userID] = user;
        this.emit('joined', user, message);

        return false; // Block second emit
    }

    private filter(groups: string[], whitelist: boolean): User[] {
        let filtered: User[] = [];

        if (groups.length === 0 && whitelist) {
            const users: UserMap = this.getUsers();
            const userIDs: string[] = Object.keys(users);
            userIDs.forEach((id: string): void => {
                filtered.push(users[id]);
            });

            return filtered;
        }

        groups.forEach((name: string): void => {
            filtered = filtered.concat(this.getGroup(name));
        });

        filtered = filtered.filter((user: User, index: number, users: User[]): boolean => {
            return users.indexOf(user) === index;
        });

        return filtered;
    }
}
