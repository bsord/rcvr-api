// create-pets.seed.ts
import { Factory, Seeder } from 'typeorm-seeding'
import { DmarcReport } from '../entity/DmarcReport'

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<any> {
      await factory(DmarcReport)().createMany(15,{ clientId: '1234567890' })
    }
  }