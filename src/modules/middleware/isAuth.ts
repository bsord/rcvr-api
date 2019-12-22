import { MiddlewareFn } from "type-graphql";
import { RequestContext } from "src/types/RequestContext";

export const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
    if(!context.req.session!.userId){
        throw new Error("not authenticated");
    }
    return next();
  };