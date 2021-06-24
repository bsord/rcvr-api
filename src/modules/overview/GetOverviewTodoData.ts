import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { OverviewTodoData } from "./get/OverviewDataTypes";
import { Domain } from "../../entity/Domain";
import { RequestContext } from "../../types/RequestContext";
import { OverviewInput } from "./get/OverviewInput";


@Resolver()
export class GetOverviewTodoDataResolver {
  @Query(() => [OverviewTodoData], { nullable: true })
  async getOverviewTodoData( 
    //Handle Arguments/inputs
    @Arg("data") {organizationId}: OverviewInput,
    @Ctx() ctx: RequestContext
  ): Promise<OverviewTodoData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get domains
    const domains = await Domain.find({
      relations: ['todos'],
      where: {organization: {id: organizationId}}
    })

    const todoData = [] as OverviewTodoData[]
    domains.forEach((domain) => {
      console.log(domain)
      domain.todos.forEach((todo) => {
        
        todoData.push(<OverviewTodoData>{
          action: todo.action, 
          ref:todo.ref, 
          domain:domain
        })
      })
    })


    return <OverviewTodoData[]> todoData
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}