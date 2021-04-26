import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { OverviewGraphData } from "./get/OverviewDataTypes";
import { DmarcReport } from "../../entity/DmarcReport";
import { Domain } from "../../entity/Domain";
import { RequestContext } from "../../types/RequestContext";
import { getRepository } from "typeorm";
import { OverviewInput } from "./get/OverviewInput"


@Resolver()
export class GetOverviewGraphDataResolver {
  @Query(() => [OverviewGraphData], { nullable: true })
  async getOverviewGraphData(
    //Handle Arguments/inputs
    @Arg("data") {organizationId}: OverviewInput,
    @Ctx() ctx: RequestContext
  ): Promise<OverviewGraphData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    //check if user is member of org


    //get domains
    const domains = await Domain.find({organization: {id: organizationId}})
    
    let domainIds = domains.map(domain => domain.domainId);

    const dmarcReport = await getRepository(DmarcReport)
        .createQueryBuilder("dmarcReport")

        .select("DATE(dmarcReport.processedTime)", "date")
        .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='pass' OR dmarcReport.dmarcSpf='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "passes")
        .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='fail' AND dmarcReport.dmarcSpf='fail' THEN dmarcReport.sourceCount ELSE 0 END)", "fails")
        .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN 0 ELSE dmarcReport.sourceCount END)", "rejects")
        .where("dmarcReport.clientId IN (:...domainIds)", { domainIds: domainIds })

        .addGroupBy('date')

        .getRawMany();

        console.log(dmarcReport)

    

    return <OverviewGraphData[]> dmarcReport
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}