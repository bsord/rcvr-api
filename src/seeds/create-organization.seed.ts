import { Factory, Seeder } from 'typeorm-seeding'
import { Organization } from '../entity/Organization'

export default class CreateOrganizations implements Seeder {
    public async run(factory: Factory): Promise<any> {
      await factory(Organization)().createMany(3)
    }
  }