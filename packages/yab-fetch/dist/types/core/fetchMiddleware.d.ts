import { ExecutableYabRequestInit, IYabFetchContext } from '../types';
export declare function settleResponse(ctx: IYabFetchContext): Promise<void>;
export declare function createFetchMiddleware(yabRequestInit: ExecutableYabRequestInit): (ctx: IYabFetchContext) => Promise<void>;
