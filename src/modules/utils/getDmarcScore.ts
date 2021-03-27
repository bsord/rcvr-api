import dns from 'dns'
const dnsPromises = dns.promises
dnsPromises.setServers(['1.1.1.1']);

type DmarcStatus = {
  score: number;
  dmarcPolicy: string;
};


export async function getDmarcScore(
  domainName: string,
): Promise<DmarcStatus> {

  try {
    let score = 1;
    //Get dns response
    const results = await dnsPromises.resolveTxt("_dmarc." + domainName)
    //extract record from response
    const dmarcRecord = results[0][0]
    //split record into parts
    const dmarcParts = dmarcRecord.split(";")
    //get policy from part
    const dmarcPolicy = dmarcParts.filter((part) => {
      return part.includes('p=')
    })[0].split('p=')[1].trim()

    if (dmarcPolicy) {
      if (dmarcPolicy == "none") {
        score = score + 1
      } else if (dmarcPolicy == "quarantine") {
        score = score + 2
      } else if (dmarcPolicy == "reject") {
        score = score + 3
      }
    }

    //get policy from part
    const dmarcReceiver = dmarcParts.filter((part) => {
      return part.includes('rua=')
    })[0].split('rua=')[1].trim()

    if (dmarcReceiver.includes('rcvr.io')) {
      score = score + 1
    }

    //return results
    let response: DmarcStatus = {
      score: score,
      dmarcPolicy: dmarcPolicy
    }
    return response
  } catch (e) {
    if (e.code == "ENOTFOUND") {
      //return results
      let response: DmarcStatus = {
        score: 1,
        dmarcPolicy: "No DMARC Policy"
      }
      return response
    } else {
      throw e
    }
  }

}