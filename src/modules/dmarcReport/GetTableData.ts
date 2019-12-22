import { Resolver, Query, Ctx} from "type-graphql";
import { DmarcTableData } from "../../entity/DmarcGraphData";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import {getRepository} from "typeorm";


@Resolver()
export class GetTableDataResolver {
  @Query(() => [DmarcTableData], { nullable: true })
  async getTableData(@Ctx() ctx: RequestContext): Promise<DmarcTableData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    const dmarcReport = await getRepository(DmarcReport)
      .createQueryBuilder("dmarcReport")
      .select('sourceIp')
      .addSelect("hostname", "hostname")
      .addSelect("provider", "provider")
      .addSelect("SUM(dmarcReport.sourceCount)", "volume")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "dkimPassCount")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcSpf='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "spfPassCount")
      .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN 0 ELSE dmarcReport.sourceCount END)", "blockedCount")

      .where("dmarcReport.clientId = :id", { id: ctx.req.session!.clientId })

      .addGroupBy('sourceIp')
      .orderBy('volume', 'DESC')
      .getRawMany();

      console.log(dmarcReport)
    

    return <DmarcTableData[]> dmarcReport
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}