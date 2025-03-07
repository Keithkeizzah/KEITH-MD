import './lib/init';
import c from './lib/c';
import cpp from './lib/cpp';
import python from './lib/python';
import node from './lib/node';
import java from './lib/java';
import { errorResultCallback, Options, LanguageExtMap, LanguageNames, Result } from './lib/types';
declare const compileRun: {
    c: {
        runFile: typeof import("./lib/c/run-file").runCFile;
        runSource: typeof import("./lib/c/run-source").runCSource;
    };
    cpp: {
        runFile: typeof import("./lib/cpp/run-file").runCppFile;
        runSource: typeof import("./lib/cpp/run-source").runCppSource;
    };
    python: {
        runFile: typeof import("./lib/python/run-file").runPythonFile;
        runSource: typeof import("./lib/python/run-source").runPythonSourceCode;
    };
    node: {
        runFile: typeof import("./lib/node/run-file").runNodeFile;
        runSource: typeof import("./lib/node/run-source").runNodeSourceCode;
    };
    java: {
        runSource: typeof import("./lib/java/run-source").runJavaSource;
        runFile: typeof import("./lib/java/run-file").runJavaFile;
    };
};
export { c, cpp, python, node, java, errorResultCallback, Options, LanguageExtMap, LanguageNames, Result };
export default compileRun;
