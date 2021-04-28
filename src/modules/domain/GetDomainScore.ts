import { Resolver, Query, Arg, Ctx} from "type-graphql";
import { DomainScoreData } from "./get/DomainDataTypes";
import { RequestContext } from "../../types/RequestContext";
import { Domain } from "../../entity/Domain";

@Resolver()
export class GetDomainScoreResolver {
  @Query(() => DomainScoreData, { nullable: true })
  async getDomainScore(
    @Arg("id") id: string,
    @Ctx() ctx: RequestContext
  ): Promise<DomainScoreData | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    
    // todo: check org membership 
    let domain = await Domain.findOne({id: id})
    let domainScoreData = <DomainScoreData>{}
    if(!domain){
      throw new Error(`The domain with id: ${id} does not exist!`);
      
    } else {

      domainScoreData = <DomainScoreData>{
        domain: domain.name,
        id: domain.id,
        domainScore: domain.domainScore,
        dmarcPolicy: domain.dmarcPolicy
      }

    }

    return domainScoreData
  }
}