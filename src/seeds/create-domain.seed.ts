import { Factory, Seeder } from 'typeorm-seeding'
import { Domain } from '../entity/Domain'

export default class CreateDomains implements Seeder {
    public async run(factory: Factory): Promise<any> {
      //await factory(Domain)().createMany(3)
      await factory(Domain)().create({ domainId: '1234567890' })
    }
  }