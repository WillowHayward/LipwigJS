/**
 * @author: William Hayward
 */
import { Client } from './Client';
import { Host } from './Host';

export namespace Lipwig {
    export const join: Function = (url: string, code: string, data: object = {}): Client => {
        return new Client(url, code, data);
    };

    export const create: Function = (url: string, options: object = {}): Host => {
        return new Host(url, options);
    };
}
