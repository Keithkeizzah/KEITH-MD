export interface Result {
    stdout: string;
    stderr: string;
    exitCode: number;
    /**
     * Memory used by program in Bytes
     */
    memoryUsage: number;
    /**
     * CPU time by program in microseconds
     */
    cpuUsage: number;
    /**
     * Signal resulting, if any, resulting from the code execution
    */
    signal: string;
    errorType?: 'compile-time' | 'run-time' | 'pre-compile-time' | 'run-timeout';
}
