export interface Options {
    timeout?: number;
    stdin?: string;
    compileTimeout?: number;
    /**
     * Limit the ammount of characters of program's stderr, default is 1000
     */
    stderrLimit?: number;
    /**
     * Limit the ammount of characters of program's stdout, default is 1000
     */
    stdoutLimit?: number;
    /**
     * Path to the compiler like for java=>javac'path, cpp,c=>gcc's path
     *
     * can be a path like string to the compiler or custom command name whose path is already set
     */
    compilationPath?: string;
    /**
     * Path to the execution Command like for python,node,java
     *
     * Can be a path like string to the compiler or custom command name whose path is already set
     * like some people use python3 for python v3.6 and python for python v2.7
     */
    executionPath?: string;
    /**
     * Set or compiler args if necessary for the specific language
     */
    compilerArgs?: string;
}
