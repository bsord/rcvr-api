import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Domain } from "../../entity/Domain";
import { logger } from "../middleware/logger";
import { RequestContext } from "../../types/RequestContext";
import { getDmarcScore } from "../utils/getDmarcScore";


@Resolver()
export class ScoreDomainResolver {

  @UseMiddleware(logger)

  @Mutation(() => Domain)
  async scoreDomain(
    //Handle Arguments/inputs
    @Arg("domainId") domainId: string,
    @Ctx() ctx: RequestContext
  ): Promise<Domain | undefined> {


    //Function for handling resolver

    if (!ctx.req.session!.userId) {
      return undefined
    }

    const domain = await Domain.findOne({ where: { domainId: domainId } })

    if (domain) {
      try {
        const res = await getDmarcScore(domain.name)
        domain.domainScore = res.score
        domain.dmarcPolicy = res.dmarcPolicy
        await domain.save()
      } catch (e) {
        console.log(e)
      }
    }

    return domain
  }

}