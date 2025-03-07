import { MethodlessRequestOptions } from "./helpers/http";
export declare class RequestClient {
    readonly base?: string | undefined;
    readonly options?: MethodlessRequestOptions | undefined;
    constructor(base?: string | undefined, options?: MethodlessRequestOptions | undefined);
    get(route: string, options?: MethodlessRequestOptions): Promise<string>;
    _handleError(error: unknown): unknown;
}
