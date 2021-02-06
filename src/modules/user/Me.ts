import { Resolver, Query, Ctx} from "type-graphql";
import { User } from "../../entity/User";
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: RequestContext): Promise<User | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    return User.findOne(ctx.req.session!.userId, { relations: ["organizations"]  })
  }
}