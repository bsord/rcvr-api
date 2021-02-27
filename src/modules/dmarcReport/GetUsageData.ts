import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { DmarcUsageData } from "./get/DmarcDataTypes";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import { getRepository } from "typeorm";
import { Organization } from "../../entity/Organization";

@Resolver()
export class GetUsageDataResolver {
  @Query(() => DmarcUsageData, { nullable: true })
  async getUsageData(
    //Handle Arguments/inputs
    @Arg("organizationId") organizationId: string,
    @Ctx() ctx: RequestContext
  ): Promise<DmarcUsageData | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get org that owns domain, make sure user is a member of the org.
    const organization = await Organization.findOne({
      relations: ['domains'],
      where: {id: organizationId}
    })

    const domainList = organization?.domains.map(domain => {
      return domain.domainId
    })

    const dmarcReport = await getRepository(DmarcReport)
      .createQueryBuilder("dmarcReport")
      .select('clientId')
      .addSelect("SUM(dmarcReport.sourceCount)", "volume")
      .where("dmarcReport.clientId IN (:...domains)", { domains: domainList })

      .addGroupBy('clientId')
      .orderBy('volume', 'DESC')
      .getRawMany();

      
      let totalVolume = 0
      for(let i = 0; i < dmarcReport.length; i++){
        totalVolume += parseInt(dmarcReport[i].volume)
      }

      const usageData = new DmarcUsageData()
      usageData.total = totalVolume
      usageData.breakdown = dmarcReport

    return <DmarcUsageData> usageData
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }
}