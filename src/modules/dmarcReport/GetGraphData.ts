import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { DmarcGraphData } from "./get/DmarcDataTypes";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import { getRepository } from "typeorm";
import { ReportInput } from "./get/ReportInput"


@Resolver()
export class GetGraphDataResolver {
  @Query(() => [DmarcGraphData], { nullable: true })
  async getGraphData(
    //Handle Arguments/inputs
    @Arg("data") {domainId}: ReportInput,
    @Ctx() ctx: RequestContext
  ): Promise<DmarcGraphData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    const dmarcReport = await getRepository(DmarcReport)
    .createQueryBuilder("dmarcReport")

    .select("DATE(dmarcReport.processedTime)", "date")
    .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='pass' OR dmarcReport.dmarcSpf='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "passes")
    .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='fail' AND dmarcReport.dmarcSpf='fail' THEN dmarcReport.sourceCount ELSE 0 END)", "fails")
    .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN 0 ELSE dmarcReport.sourceCount END)", "rejects")
    .where("dmarcReport.clientId = :id", { id: domainId })

    .addGroupBy('date')

    .getRawMany();

    console.log(dmarcReport)

    return <DmarcGraphData[]> dmarcReport
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}