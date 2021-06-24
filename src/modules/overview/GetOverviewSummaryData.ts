import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { OverviewSummaryData } from "./get/OverviewDataTypes";
import { DmarcReport } from "../../entity/DmarcReport";
import { Domain } from "../../entity/Domain";
import { RequestContext } from "../../types/RequestContext";
import { OverviewInput } from "./get/OverviewInput"
import {getRepository} from "typeorm";


@Resolver()
export class GetOverviewSummaryDataResolver {
  @Query(() => OverviewSummaryData, { nullable: true })
  async getOverviewSummaryData(
    //Handle Arguments/inputs
    @Arg("data") {organizationId}: OverviewInput,
    @Ctx() ctx: RequestContext
  ): Promise<OverviewSummaryData | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get domains
    const domains = await Domain.find({organization: {id: organizationId}})
    
    let domainIds = domains.map(domain => domain.domainId);
    console.log(domainIds.toString())
    console.log('test')

    const summaryResults = await getRepository(DmarcReport)
      .createQueryBuilder("dmarcReport")
      .select("SUM(dmarcReport.sourceCount)", "totalProcessed")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='pass' OR dmarcReport.dmarcSpf='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "dmarcPassed")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='fail' AND dmarcReport.dmarcSpf='fail' THEN dmarcReport.sourceCount ELSE 0 END)", "dmarcFailed")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "dkimPassed")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='fail' THEN dmarcReport.sourceCount ELSE 0 END)", "dkimFailed")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcSpf='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "spfPassed")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcSpf='fail' THEN dmarcReport.sourceCount ELSE 0 END)", "spfFailed")
      .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN 0 ELSE dmarcReport.sourceCount END)", "rejected")
      .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN dmarcReport.sourceCount ELSE 0 END)", "delivered")
      .where("dmarcReport.clientId IN (:...domainIds)", { domainIds: domainIds })
      .getRawOne();

    return <OverviewSummaryData> summaryResults
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}