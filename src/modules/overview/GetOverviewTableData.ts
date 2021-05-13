import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { OverviewTableData } from "./get/OverviewDataTypes";
import { Domain } from "../../entity/Domain";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import { OverviewInput } from "./get/OverviewInput";
import { getRepository } from "typeorm";


@Resolver()
export class GetOverviewTableDataResolver {
  @Query(() => [OverviewTableData], { nullable: true })
  async getOverviewTableData( 
    //Handle Arguments/inputs
    @Arg("data") {organizationId}: OverviewInput,
    @Ctx() ctx: RequestContext
  ): Promise<OverviewTableData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

        //get domains
        const domains = await Domain.find({organization: {id: organizationId}})
    
        let domainIds = domains.map(domain => domain.domainId);
        console.log(domainIds.toString())
        console.log('test')
    //get org that owns domain, make sure user is a member of the org.

    const dmarcReport = await getRepository(DmarcReport)
      
      .createQueryBuilder("dmarcReport")
      .select('sourceIp')
      .addSelect("hostname", "hostname")
      .addSelect("provider", "provider")
      .addSelect("dmarcDomain", "domain")
      .addSelect("providerASNOrg", "providerASNOrg")
      .addSelect("countryCode", "countryCode")
      .addSelect("SUM(dmarcReport.sourceCount)", "volume")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcDkim='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "dkimPassCount")
      .addSelect("SUM(CASE WHEN dmarcReport.dmarcSpf='pass' THEN dmarcReport.sourceCount ELSE 0 END)", "spfPassCount")
      .addSelect("SUM(CASE WHEN dmarcReport.disposition='none' THEN 0 ELSE dmarcReport.sourceCount END)", "blockedCount")

      .where("dmarcReport.clientId IN (:...domainIds)", { domainIds: domainIds })

      .addGroupBy('provider')
      .orderBy('volume', 'DESC')
      .take(5)
      .getRawMany();
//
      console.log(dmarcReport)
    

    return <OverviewTableData[]> dmarcReport
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}