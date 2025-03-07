import { runCppFile } from './run-file';
import { runCppSource } from './run-source';
declare const cpp: {
    runFile: typeof runCppFile;
    runSource: typeof runCppSource;
};
export default cpp;
