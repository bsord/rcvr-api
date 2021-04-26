import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { OverviewProgressData } from "./get/OverviewDataTypes";
import { Domain } from "../../entity/Domain";
import { RequestContext } from "../../types/RequestContext";
import { OverviewInput } from "./get/OverviewInput";


@Resolver()
export class GetOverviewProgressDataResolver {
  @Query(() => [OverviewProgressData], { nullable: true })
  async getOverviewProgressData( 
    //Handle Arguments/inputs
    @Arg("data") {organizationId}: OverviewInput,
    @Ctx() ctx: RequestContext
  ): Promise<OverviewProgressData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get domains
    const domains = await Domain.find({organization: {id: organizationId}})

    const progressData:OverviewProgressData[] = domains.map(domain => <OverviewProgressData>{
      progressPercent: Math.round((domain.domainScore / 6) * 100),
      domain: domain.name,
      id: domain.id,
      domainScore: domain.domainScore
    })

    return <OverviewProgressData[]> progressData
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}