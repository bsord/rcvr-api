import { Resolver, Mutation, Arg, Ctx} from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from 'bcryptjs'
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() ctx: RequestContext
  ): Promise<User | null> {
    
    const user = await User.findOne({where:{email}})
    if(!user){
        return null
    }

    const valid = await bcrypt.compare(password, user.password)
    if(!valid){
        return null
    }

    if(!user.confirmed){
      return null; //throw an error instead!
    }
    
    ctx.req.session!.userId = user.id
    //ctx.req.session!.clientId = user.clientId
    console.log(ctx.req.session!)
    return user
  }

}