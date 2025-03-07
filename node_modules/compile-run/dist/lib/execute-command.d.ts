import { Options, Result } from "./types";
/**
 * Execute a command taking spawn like arguments and returns a result promise
 * @param cmd
 * @param args
 * @param options
 */
export declare function execute(cmd: string, args: string[], options?: Options): Promise<Result>;
/**
 * Execute a command taking spawn like arguments and returns a result promise
 * @param cmd
 * @param options
 */
export declare function execute(cmd: string, options?: Options): Promise<Result>;
/**
 * Execute a command taking spawn like arguments and returns a result promise
 * @param cmd
 * @param args
 */
export declare function execute(cmd: string, args?: string[]): Promise<Result>;
