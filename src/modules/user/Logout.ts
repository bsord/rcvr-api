import { Resolver, Mutation, Ctx} from "type-graphql";
import { RequestContext } from "../../types/RequestContext";


@Resolver()
export class LogoutResolver {

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: RequestContext): Promise<Boolean> {
    return new Promise((res,rej)=>{
        ctx.req.session!.destroy(err => {
            if(err){
                return rej(false);
            }
            ctx.res.clearCookie('qid');
            return res(true);
        })
    })
  }

}