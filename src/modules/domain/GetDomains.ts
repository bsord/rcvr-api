import { Resolver, Query, Arg, Ctx} from "type-graphql";
import { GetDomainInput } from "./get/DomainInput";
import { RequestContext } from "../../types/RequestContext";
import { Domain } from "../../entity/Domain";

@Resolver()
export class GetDomainsResolver {
  @Query(() => [Domain], { nullable: true })
  async getDomains(
    @Arg("data") {organizationId}: GetDomainInput,
    @Ctx() ctx: RequestContext
  ): Promise<Domain[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    
    // todo: check org membership 
    return Domain.find({organization: {id: organizationId}})
  }
}