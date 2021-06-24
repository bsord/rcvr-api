import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { DmarcTableData } from "./get/DmarcDataTypes";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import { ReportInput } from "./get/ReportInput";
import { getRepository } from "typeorm";


@Resolver()
export class GetTableDataResolver {
  @Query(() => [DmarcTableData], { nullable: true })
  async getTableData(
    //Handle Arguments/inputs
    @Arg("data") {domainId}: ReportInput,
    @Ctx() ctx: RequestContext
  ): Promise<DmarcTableData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get org that owns domain, make sure user is a member of the org.

    const dmarcReport = await getRepository(DmarcReport)
      .createQueryBuilder("dmarcReport")
      .select('sourceIp')
      .addSelect("hostname", "hostname")
      .addSelect("provider", "provider")

      .addSelect("CASE WHEN dmarcReport.dmarcDkim='pass' OR dmarcReport.dmarcSpf='pass' THEN 'pass' ELSE 'fail' END", "dmarcResult")
      
      
      .addSelect("spfDomain", "spfDomain") //spf domain
      .addSelect("spfResult", "spfResult") //spf result
      .addSelect("dmarcSPF", "spfAlignment") //spf alignment
      
      .addSelect("dkimDomain", "dkimDomain")
      .addSelect("dkimResult", "dkimResult")
      .addSelect("dmarcDkim", "dkimAlignment")

      .addSelect("SUM(dmarcReport.sourceCount)", "volume")

      .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN 0 ELSE dmarcReport.sourceCount END)", "blockedCount")

      .where("dmarcReport.clientId = :id", { id: domainId })

      .addGroupBy('sourceIp')
      .orderBy('volume', 'DESC')
      .getRawMany();

      console.log(dmarcReport)
    

    return <DmarcTableData[]> dmarcReport
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}