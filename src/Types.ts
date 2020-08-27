/**
 * @author: William Hayward
 */
export type Message = {
    event: string;
    data: unknown[];
    recipient: string[];
    sender: string;
};

export type DataMap = {
  [key:string]: unknown
};

export const DEFAULTS = {
  port: 8080
};

