/**
 * @author: William Hayward
 */
import { Person } from './Person';
export class Client extends Person {
    constructor(url: string, code: string, data: object = {}) {
        super();
    }
}
