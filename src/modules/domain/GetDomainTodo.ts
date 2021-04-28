import { Resolver, Query, Ctx, Arg} from "type-graphql";
import { DomainTodoData } from "./get/DomainDataTypes";
import { Domain } from "../../entity/Domain";
import { RequestContext } from "../../types/RequestContext";


@Resolver()
export class GetDomainTodoResolver {
  @Query(() => [DomainTodoData], { nullable: true })
  async getDomainTodo( 
    //Handle Arguments/inputs
    @Arg("id") id: string,
    @Ctx() ctx: RequestContext
  ): Promise<DomainTodoData[] | undefined> {
    
    if(!ctx.req.session!.userId){
        return undefined
    }

    //get domains
    const domain = await Domain.findOne({
      relations: ['todos'],
      where: {id: id}
    })

    const todoData = [] as DomainTodoData[]

    
    if(!domain){
      throw new Error(`The domain with id: ${id} does not exist!`);
      
    } else {

      domain.todos.forEach((todo) => {
        todoData.push(<DomainTodoData>{
          action: todo.action, 
          ref:todo.ref, 
          domain:domain
        })
      })

    }


    return <DomainTodoData[]> todoData
    //return DmarcReport.find({where:{clientId: ctx.req.session!.clientId}})
  }


}