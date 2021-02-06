
import Faker from 'faker'
import { Organization } from "../entity/Organization";
import { define } from 'typeorm-seeding'

define(Organization, (faker: typeof Faker) => {

    const organization = new Organization()
    organization.name = faker.company.companyName()

    return organization
  })
