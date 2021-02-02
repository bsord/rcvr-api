import { Resolver, Query, Ctx} from "type-graphql";
import { Organization } from "../../entity/Organization";
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class MyOrganizationResolver {
  @Query(() => Organization, { nullable: true })
  async myOrganization(@Ctx() ctx: RequestContext): Promise<Organization | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    return Organization.findOne(1)
  }
}