import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { DmarcSummaryData } from "./get/DmarcDataTypes";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import { ReportInput } from "./get/ReportInput"
import {getRepository} from "typeorm";


@Resolver()
export class GetSummaryDataResolver {
  @Query(() => DmarcSummaryData, { nullable: true })
  async getSummaryData(
    //Handle Arguments/inputs
    @Arg("data") {domainId}: ReportInput,
    @Ctx() ctx: RequestContext
  ): Promise<DmarcSummaryData | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

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
      .where("dmarcReport.clientId = :id", { id: domainId })
      .getRawOne();

    return <DmarcSummaryData> summaryResults
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}