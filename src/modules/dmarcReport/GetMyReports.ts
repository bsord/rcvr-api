import { Resolver, Query, Ctx} from "type-graphql";
import { DmarcReport } from "../../entity/DmarcReport";
import { RequestContext } from "../../types/RequestContext";

@Resolver()
export class GetMyReportsResolver {
  @Query(() => [DmarcReport], { nullable: true })
  async getMyReports(@Ctx() ctx: RequestContext): Promise<DmarcReport[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    
    return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}