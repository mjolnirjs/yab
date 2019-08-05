import { IYabFetchContext, YabFetchError, ExecutableYabRequestInit } from '../types/index';
export declare class YabFetchContext implements IYabFetchContext {
    private _yabRequestInit;
    private _requestInit?;
    private _response?;
    private _error;
    constructor(init: ExecutableYabRequestInit);
    yabRequestInit: ExecutableYabRequestInit;
    requestInit: RequestInit;
    response: Response;
    error: YabFetchError | undefined;
    throw(message: string): void;
}
