import { Resolver, Mutation, Arg, UseMiddleware, Ctx} from "type-graphql";
import { Domain } from "../../entity/Domain";
import { logger } from "../middleware/logger";
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class DeleteDomainResolver {

  @UseMiddleware(logger)

  @Mutation(() => Boolean)
  async deleteDomain(
      //Handle Arguments/inputs
      @Arg("id") id: string,
      @Ctx() ctx: RequestContext
  ): Promise<Boolean | undefined> {
    const domain = await Domain.findOne({ where: { id }});
    //Function for handling resolver

    if(!ctx.req.session!.userId){
        return undefined
    }

    if (!domain) {
        throw new Error(`The domain with id: ${id} does not exist!`);
    }

    //const domain = await Domain.findOne({id: domainId})
    await domain.remove()

    return true
  }

}

