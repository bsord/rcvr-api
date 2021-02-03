import { Resolver, Mutation, Arg, UseMiddleware, Ctx} from "type-graphql";
import { Organization } from "../../entity/Organization";
import { OrganizationInput } from "./create/OrganizationInput";
import { logger } from "../middleware/logger";
import { RequestContext } from "../../types/RequestContext";
import { User } from "../../entity/User"


@Resolver()
export class CreateOrganizationResolver {

  @UseMiddleware(logger)

  @Mutation(() => Organization)
  async createOrganization(
      //Handle Arguments/inputs
      @Arg("data") {name}: OrganizationInput,
      @Ctx() ctx: RequestContext
  ): Promise<Organization | undefined> {

    //Function for handling resolver

    if(!ctx.req.session!.userId){
        return undefined
    }

    const userId = ctx.req.session!.userId
    const user = await User.findOne({where:{id: userId}})

    

    const org = await Organization.create({
        name,
        members: [<User>user]
    }).save()


    return org
  }

}

