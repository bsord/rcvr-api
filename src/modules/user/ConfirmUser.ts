import { Resolver, Mutation, Arg} from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
      @Arg("token") token: string
  ): Promise<boolean> {
    
    //getID from redis via token
    const userId = await redis.get(confirmUserPrefix + token)

    //set confirmed true on user 
    if(!userId){
        return false;
    }

    await User.update({id: userId}, {confirmed: true});
    await redis.del(confirmUserPrefix + token);
    
    return true;
  }

}