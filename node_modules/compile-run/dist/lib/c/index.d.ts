import { runCFile } from './run-file';
import { runCSource } from './run-source';
declare const c: {
    runFile: typeof runCFile;
    runSource: typeof runCSource;
};
export default c;
