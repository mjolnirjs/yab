import { Method } from '../utils/method';
export declare type RequestHeaders = Record<string, string> | undefined;
export declare type RequestParams = Record<string, string> | undefined;
export declare type ResponseType = 'auto' | 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData';
export interface YabRequestInit extends RequestInit {
    baseURL?: string;
    params?: RequestParams;
    data?: any;
    url?: string;
    responseType?: ResponseType;
    resolveData?(context: IYabFetchContext): Promise<unknown>;
    validateResponseStatus?(response: Response): boolean;
    before?(requestInit: RequestInit): RequestInit;
    after?(response: Response): Response;
}
export interface ExecutableYabRequestInit extends YabRequestInit {
    url: string;
    responseType: ResponseType;
    resolveData(context: IYabFetchContext): Promise<unknown>;
}
export interface YabFetcher<TFetchResult> {
    (url: string, init?: YabRequestInit): Promise<TFetchResult>;
    get(url: string, config?: YabRequestInit): Promise<TFetchResult>;
    head(url: string, config?: YabRequestInit): Promise<TFetchResult>;
    delete(url: string, config?: YabRequestInit): Promise<TFetchResult>;
    post(url: string, data?: unknown, config?: YabRequestInit): Promise<TFetchResult>;
    put(url: string, data?: unknown, config?: YabRequestInit): Promise<TFetchResult>;
    patch(url: string, data?: unknown, config?: YabRequestInit): Promise<TFetchResult>;
    use(middleware: YabFetchMiddleware | YabFetchMiddleware[]): void;
}
export declare type MethodType = keyof typeof Method;
export interface IYabFetchContext {
    yabRequestInit: ExecutableYabRequestInit;
    requestInit: RequestInit;
    response: Response;
    json?: any;
    text?: string;
    blob?: Blob;
    arrayBuffer?: ArrayBuffer;
    formData?: FormData;
    error: YabFetchError | undefined;
    [key: string]: any;
}
export declare type YabFetchMiddleware = (context: IYabFetchContext, next: () => Promise<unknown>) => void;
export interface YabFetchErrorOptions {
    error?: Error;
    errorMessage?: string;
    yabRequestInit: ExecutableYabRequestInit;
    requestInit?: RequestInit;
    response?: Response;
}
export interface YabFetchError extends Error {
    yabRequestInit: ExecutableYabRequestInit;
    requestInit: RequestInit;
    response?: Response;
}
