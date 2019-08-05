import { YabRequestInit, YabFetcher, YabFetchMiddleware, IYabFetchContext } from '../types/index';
export declare class YabFetch {
    private _requestInit?;
    private _middlewares;
    constructor(requestInit?: YabRequestInit);
    fetch: (url: string, directOptions?: YabRequestInit | undefined) => Promise<unknown>;
    use: (middleware: YabFetchMiddleware | YabFetchMiddleware[]) => this;
}
export declare function createFetch<TFetchResult = IYabFetchContext>(requestInit?: YabRequestInit & {
    resolveData?(context: IYabFetchContext): Promise<TFetchResult>;
}): YabFetcher<TFetchResult>;
