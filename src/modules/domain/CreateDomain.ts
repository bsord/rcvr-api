import { Resolver, Mutation, Arg, UseMiddleware, Ctx} from "type-graphql";
import { Domain } from "../../entity/Domain";
import { DomainInput } from "./create/DomainInput";
import { logger } from "../middleware/logger";
import { RequestContext } from "../../types/RequestContext";
import { Organization } from "../../entity/Organization";
const generate = require('nanoid/generate')

@Resolver()
export class CreateDomainResolver {

  @UseMiddleware(logger)

  @Mutation(() => Domain)
  async createDomain(
      //Handle Arguments/inputs
      @Arg("data") {name, organizationId}: DomainInput,
      @Ctx() ctx: RequestContext
  ): Promise<Domain | undefined> {

    //Function for handling resolver

    if(!ctx.req.session!.userId){
        return undefined
    }
    
    const org = await Organization.findOne({where:{id: organizationId}})
    // check if requestor is member of org or owner of org
    
    const domain = await Domain.create({
        name,
        domainId: generate("1234567890abcdef", 12),
        organization: org
    }).save()


    return domain
  }

}

