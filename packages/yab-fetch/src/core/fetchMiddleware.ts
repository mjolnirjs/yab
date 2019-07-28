import { ExecutableYabRequestInit, IYabFetchContext } from '../types';
import { getRequestInit } from '../utils';
import { createError } from './error';

export async function settleResponse(ctx: IYabFetchContext) {
  const { yabRequestInit, response } = ctx;

  switch (yabRequestInit.responseType) {
    case 'json': {
      ctx.json = await response.json();
      break;
    }
    case 'text': {
      ctx.text = await response.text();
      break;
    }
    case 'blob': {
      ctx.blob = await response.blob();
      break;
    }
    case 'arrayBuffer': {
      ctx.arrayBuffer = await response.arrayBuffer();
      break;
    }
    case 'formData': {
      ctx.formData = await response.formData();
      break;
    }
    case 'auto':
    default: {
      try {
        ctx.json = await response.json();
      } catch {
        /* ignore */
      }
      break;
    }
  }
}

export function createFetchMiddleware(
  yabRequestInit: ExecutableYabRequestInit
) {
  // TODO:
  const browserFetch = window.fetch;

  return async (ctx: IYabFetchContext) => {
    try {
      // generate native fetch request init
      let requestInit = getRequestInit(yabRequestInit);

      if (yabRequestInit.before) {
        requestInit = yabRequestInit.before(requestInit);
      }

      // fetch
      let response;
      try {
        // >_ Send fetch Request
        response = await browserFetch(yabRequestInit.url, requestInit);

        if (yabRequestInit.after) {
          response = yabRequestInit.after(response);
        }
      } catch (nativefetchError) {
        throw createError({
          error: nativefetchError,
          yabRequestInit,
          requestInit
        });
      }

      ctx.response = response;

      // invalid response status
      if (
        yabRequestInit.validateResponseStatus &&
        !yabRequestInit.validateResponseStatus(response)
      ) {
        throw createError({
          errorMessage: `Request failed with status code ${response.status}`,
          yabRequestInit,
          requestInit,
          response
        });
      } else {
        await settleResponse(ctx);
      }
    } catch (error) {
      ctx.error = error;
    }
  };
}
