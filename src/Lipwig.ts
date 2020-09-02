/**
 * Primary class to initate interaction with a LipwigCore server
 * @author: William Hayward
 */
import { LipwigClient } from './LipwigClient';
import { LipwigHost } from './LipwigHost';
//import { DataMap } from './Types';

export {
  LipwigClient,
  LipwigHost
}

/*export const Lipwig = {
  /**
     * Attempt to join an existing Lipwig room
     * @param url   Websocket url of LipwigCore server
     * @param code  Room code to attempt to join
     * @param data  Data to pass to room host on connection
     * @return New client object
     */
/*join : (url: string, code: string, data: DataMap = {}): Client => {
    return new Client(url, code, data);
  },

  /**
     * Create a new Lipwig room
     * @param url       Websocket url of LipwigCore server
     * @param options   Options with which to create room
     */
/*create : (url: string, options: DataMap = {}): Host => {
    return new Host(url, options);
  }
}

*/
