/// <reference types="node" />
import { ChildProcess } from "child_process";
/**
 * Write the stdin into the child process
 * @param proc Child process refrence
 * @param stdin stdin string
 */
export declare function writeToStdin(proc: ChildProcess, stdin: string): void;
