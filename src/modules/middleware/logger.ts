import { MiddlewareFn } from "type-graphql";
import { RequestContext } from "src/types/RequestContext";

export const logger: MiddlewareFn<RequestContext> = async ({ args }, next) => {
    console.log("args: ", args)
    return next();
  };