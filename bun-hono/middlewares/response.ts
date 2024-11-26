import { createMiddleware } from "hono/factory";

import { ApiError } from "@/utils/error.responses";

export const ResponseMiddleware = createMiddleware(async (c, next) => {
  await next();

  const isOk = c.res.ok;
  const status = c.res.status;

  const isError = c.error;
  const isErrorInstance = isError instanceof ApiError;

  if (!isOk) {
    if (isError && isErrorInstance) {
      const error = c.error as ApiError;

      c.res = new Response(
        JSON.stringify({
          success: false,
          statusCode: error.statusCode || status,
          message: error.message,
          errorCode: error.errorCode,
          error: error.stack,
        }),
        {
          status: error.statusCode || status,
        }
      );
    } else if (isError && !isErrorInstance) {
      c.res = new Response(
        JSON.stringify({
          success: false,
          statusCode: c.res.status,
          message: c.error?.stack,
          errorCode: "INTERNAL_SERVER_ERROR",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      c.res = new Response(
        JSON.stringify({
          success: false,
          statusCode: status,
          message: c.res.statusText || "Internal Server Error",
          errorCode: "INTERNAL_SERVER_ERROR",
        }),
        {
          status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    const responseBody = await c.res.json();

    c.res = new Response(
      JSON.stringify({
        success: true,
        statusCode: responseBody.statusCode,
        message: responseBody.message,
        data: responseBody.data,
      }),
      {
        status: responseBody.statusCode,
      }
    );
  }
});
