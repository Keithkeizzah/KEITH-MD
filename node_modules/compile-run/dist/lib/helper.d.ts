/**
 * A helper fn to make code more dry for the runfile and runsource set of funtions
 *
 * It just takes care of the optional callback and options obj and return the result promise and execute callback if provided.
 * @param arg0 First argument to be passed into function
 * @param func Function to be executed, Must return a promise
 * @param args Arguments to be taken care of
 */
export declare function multipleArgsCallbackifier<T>(arg0: any, func: (...ar: any[]) => Promise<T>, ...args: any[]): Promise<T>;
