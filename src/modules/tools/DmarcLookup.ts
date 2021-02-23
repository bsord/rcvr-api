import { Resolver, Query, Arg } from "type-graphql";
import {DmarcStatus } from "./types/ToolTypes"
import dns from 'dns'
const dnsPromises = dns.promises
dnsPromises.setServers(['1.1.1.1']);

@Resolver()
export class GetDmarcStatusResolver {
  
  @Query(() => DmarcStatus, { nullable: true })
  async getDmarcStatus(
      @Arg("domainName") domainName: string,
  ): Promise<DmarcStatus | null> {

    //Get dns response
    const results = await dnsPromises.resolveTxt("_dmarc."+domainName)
    //extract record from response
    const dmarcRecord = results[0][0]
    //split record into parts
    const dmarcParts = dmarcRecord.split(";")
    //get policy from part
    const dmarcPolicy = dmarcParts.filter((part)=>{
      return part.includes('p=')
    })[0].split('p=')[1].trim()

    //return results
    let response: DmarcStatus = {
      record: dmarcRecord,
      policy: dmarcPolicy,
      domain: domainName,
    }

    return response
  }

}