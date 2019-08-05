import { YabRequestInit, ExecutableYabRequestInit } from '../types/index';
export declare function combineURL(left: string, right: string): string;
export declare function appendURLParams(url: string, paramString: string): string;
export declare function isAbsoluteURL(url: string): boolean;
export declare function createURL(init: Pick<ExecutableYabRequestInit, 'url' | 'baseURL' | 'params'>): string;
export declare function getYabRequestInit(...sources: (Partial<YabRequestInit> | undefined)[]): ExecutableYabRequestInit;
export declare function isJSONObject(val: any): boolean;
export declare function isFormData(val: any): boolean;
export declare function getRequestInit(yabRequestInit: YabRequestInit): RequestInit;
