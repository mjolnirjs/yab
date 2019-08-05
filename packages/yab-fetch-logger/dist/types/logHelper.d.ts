import { IYabFetchContext } from 'yab-fetch';
import { Logger } from './type';
export declare const logBeforeFetch: (logger: Logger, ctx: IYabFetchContext) => void;
export declare const logAfterFetch: (logger: Logger, ctx: IYabFetchContext) => void;
export declare const logError: (logger: Logger, err: Error) => void;
