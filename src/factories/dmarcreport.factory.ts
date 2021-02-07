
import Faker from 'faker'
import { DmarcReport } from "../entity/DmarcReport";
import { define } from 'typeorm-seeding'
const generate = require('nanoid/generate')

define(DmarcReport, (faker: typeof Faker) => {
    var nowDate = new Date();
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 15);
    var domainName = faker.internet.domainName()
    const dmarcReport = new DmarcReport()
    var fqdnHost = faker.internet.domainWord() + '.' + domainName
    var passFail = Math.random() < 0.5 ? 'pass' : 'fail';

    dmarcReport.processedTime = faker.date.between(pastDate, nowDate);
    dmarcReport.msgHash = 'fakenoref'
    dmarcReport.clientId = generate("1234567890abcdef", 12)
    dmarcReport.orgName = domainName;
    dmarcReport.dmarcDomain = domainName;
    dmarcReport.sourceIp = faker.internet.ip();
    dmarcReport.provider = 'tbd'
    dmarcReport.hostname = fqdnHost;
    dmarcReport.sourceCount = faker.random.number(2)
    dmarcReport.disposition = "none"
    dmarcReport.dmarcSpf = passFail;
    dmarcReport.dmarcDkim = passFail;
    dmarcReport.headerFrom = domainName;
    dmarcReport.dkimDomain = domainName;
    dmarcReport.dkimResult = passFail;
    dmarcReport.spfDomain = domainName;
    dmarcReport.spfResult = passFail;

    return dmarcReport
  })
