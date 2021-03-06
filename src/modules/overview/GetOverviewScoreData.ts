import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { OverviewScoreData } from "./get/OverviewDataTypes";
import { Domain } from "../../entity/Domain";
import { RequestContext } from "../../types/RequestContext";
import { OverviewInput } from "./get/OverviewInput";


@Resolver()
export class GetOverviewScoreDataResolver {
  @Query(() => OverviewScoreData, { nullable: true })
  async getOverviewScoreData( 
    //Handle Arguments/inputs
    @Arg("data") {organizationId}: OverviewInput,
    @Ctx() ctx: RequestContext
  ): Promise<OverviewScoreData | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get domains
    const domains = await Domain.find({organization: {id: organizationId}})

    const totalDomains = domains.length
    const summedScore = domains.filter(({defensive}) => defensive != false).reduce((a,b)=>{
      return a+b['domainScore']
    },0)

    const defensiveDomainsCount = domains.filter(({defensive}) => defensive != false).length
    const activeDomainsCount = domains.filter(({defensive}) => defensive === false).length

    const finalScore = Math.round(summedScore / totalDomains)

    const scoreData:OverviewScoreData = {
      score: finalScore,
      activeDomains: activeDomainsCount, 
      defensiveDomains: defensiveDomainsCount

    }
    return <OverviewScoreData> scoreData
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}