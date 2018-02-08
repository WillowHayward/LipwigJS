/**
 * @author: William Hayward
 */
export type Message = {
    event: string;
    data: any[]; // tslint:disable-line:no-any
    recipient: string[];
    sender: string;
};
