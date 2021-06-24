import { Resolver, Query, Arg, Ctx} from "type-graphql";
import { DomainProgressData } from "./get/DomainDataTypes";
import { RequestContext } from "../../types/RequestContext";
import { Domain } from "../../entity/Domain";

@Resolver()
export class GetDomainProgressResolver {
  @Query(() => DomainProgressData, { nullable: true })
  async getDomainProgress(
    @Arg("id") id: string,
    @Ctx() ctx: RequestContext
  ): Promise<DomainProgressData | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }
    
    // todo: check org membership 
    let domain = await Domain.findOne({id: id})
    let domainProgressData = <DomainProgressData>{}
    if(!domain){
      throw new Error(`The domain with id: ${id} does not exist!`);
      
    } else {

      domainProgressData = <DomainProgressData>{
        progressPercent: Math.round((domain.domainScore / 6) * 100),
        domain: domain.name,
        id: domain.id,
        domainScore: domain.domainScore
      }

    }

    return domainProgressData
  }
}