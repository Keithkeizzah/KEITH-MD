import { runNodeFile } from './run-file';
import { runNodeSourceCode } from './run-source';
declare const node: {
    runFile: typeof runNodeFile;
    runSource: typeof runNodeSourceCode;
};
export default node;
