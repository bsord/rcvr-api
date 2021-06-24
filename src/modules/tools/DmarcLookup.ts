import { Resolver, Query, Arg } from "type-graphql";
import { DmarcStatus } from "./types/ToolTypes"
import dns from 'dns'
import { getDmarcScore } from "../utils/getDmarcScore";
const dnsPromises = dns.promises
dnsPromises.setServers(['1.1.1.1']);
@Resolver()
export class GetDmarcStatusResolver {

  @Query(() => DmarcStatus, { nullable: true })
  async getDmarcStatus(
    @Arg("domainName") domainName: string,
  ): Promise<DmarcStatus | null> {

    const response = await getDmarcScore(domainName)

    return response
  }

}