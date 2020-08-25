/**
 * @author: William Hayward
 */
export type Message = {
    event: string;
    data: unknown[];
    recipient: string[];
    sender: string;
};

export const DEFAULTS = {
  port: 8080
};

