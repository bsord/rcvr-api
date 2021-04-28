
import Faker from 'faker'
import { Domain } from "../entity/Domain";
import { define } from 'typeorm-seeding'

define(Domain, (faker: typeof Faker) => {

    const domain = new Domain()
    domain.name = faker.internet.domainName()
    domain.defensive = faker.random.boolean()
    const score = faker.random.number(5)
    switch (score) {
        case 1:
            domain.domainScore = score
            domain.dmarcPolicy = "No DMARC Policy"
            break;
        case 2:
            domain.domainScore = score
            domain.dmarcPolicy = "v=DMARC1; p=none; rua=mailto:report@monitor.com"
            break;
        case 3:
            domain.domainScore = score
            domain.dmarcPolicy = "v=DMARC1; p=none; rua=mailto:xxxxxxxxxxxx@rcvr.io"
            break;
        case 4:
            domain.domainScore = score
            domain.dmarcPolicy = "v=DMARC1; p=quarantine; pct=100; rua=mailto:xxxxxxxxxxxx@rcvr.io; ruf=mailto:xxxxxxxxxxxx@rcvr.io"
            break;
        case 5:
            domain.domainScore = score
            domain.dmarcPolicy = "v=DMARC1; p=reject; rua=mailto:xxxxxxxxxxxx@rcvr.io; ruf=mailto:xxxxxxxxxxxx@rcvr.io"
            break;
    }
    return domain
})