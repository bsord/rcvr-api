import { Resolver, Query} from "type-graphql";
import { DmarcReport } from "../../entity/DmarcReport";

@Resolver()
export class GetReportsResolver {
  @Query(() => [DmarcReport], { nullable: true })
  async getReports(): Promise<DmarcReport[] | null> {


    return DmarcReport.find()
  }


}