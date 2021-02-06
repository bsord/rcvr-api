
import Faker from 'faker'
import { Domain } from "../entity/Domain";
import { define } from 'typeorm-seeding'

define(Domain, (faker: typeof Faker) => {

    const domain = new Domain()
    domain.name = faker.internet.domainName()

    return domain
})