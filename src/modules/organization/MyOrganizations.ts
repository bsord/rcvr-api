import { Resolver, Query, Ctx} from "type-graphql";
import { Organization } from "../../entity/Organization";
import { User } from "../../entity/User";
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class MyOrganizationsResolver {
  @Query(() => [Organization], { nullable: true })
  async myOrganizations(@Ctx() ctx: RequestContext): Promise<Organization[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    const user = await User.findOne({
      relations: ['organizations'],
      where: {id: ctx.req.session!.userId}
    })
    return user?.organizations
  }
}