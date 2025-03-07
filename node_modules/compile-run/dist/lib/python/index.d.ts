import { runPythonFile } from './run-file';
import { runPythonSourceCode } from './run-source';
declare const python: {
    runFile: typeof runPythonFile;
    runSource: typeof runPythonSourceCode;
};
export default python;
