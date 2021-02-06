import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";
import { ReportInput } from "./get/ReportInput"

@Resolver()
export class GetMyReportsResolver {
  @Query(() => [DmarcReport], { nullable: true })
  async getMyReports(
    //Handle Arguments/inputs
    @Arg("data") {domainId}: ReportInput,
    @Ctx() ctx: RequestContext
  ): Promise<DmarcReport[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    
    return DmarcReport.find({where:{clientId: domainId}})
  }


}