/**
 * Primary class to initate interaction with a LipwigCore server
 * @author: William Hayward
 */
import { Client } from './Client';
import { Host } from './Host';

export namespace Lipwig {

    /**
     * Attempt to join an existing Lipwig room
     * @param url   Websocket url of LipwigCore server
     * @param code  Room code to attempt to join
     * @param data  Data to pass to room host on connection
     * @return New client object
     */
    export const join: Function = (url: string, code: string, data: object = {}): Client => {
        return new Client(url, code, data);
    };

    /**
     * Create a new Lipwig room
     * @param url       Websocket url of LipwigCore server
     * @param options   Options with which to create room
     */
    export const create: Function = (url: string, options: object = {}): Host => {
        return new Host(url, options);
    };
}
