import { Resolver, Mutation, Arg, Ctx} from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../constants/redisPrefixes";
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => User)
  async confirmUser(
      @Arg("token") token: string,
      @Ctx() ctx: RequestContext
  ): Promise<User|undefined> {
    
    //getID from redis via token
    const userId = await redis.get(confirmUserPrefix + token)

    //set confirmed true on user 
    if(!userId){
        return undefined;
    }

    await User.update({id: userId}, {confirmed: true});
    await redis.del(confirmUserPrefix + token);
    ctx.req.session!.userId = userId
    return User.findOne({where:{id: userId}})
  }

}