// create-pets.seed.ts
import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '../entity/User'
import { Organization } from '../entity/Organization'
import { Domain } from '../entity/Domain'
import { DmarcReport } from '../entity/DmarcReport'

const generate = require('nanoid/generate')

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<any> {
    
        const domainId = generate("1234567890abcdef", 12)

        //create user
        await factory(User)()
            .map(async (user: User) => {

                //create orgs
                const organizations: Organization[] = await factory(Organization)()
                .map(async (organization: Organization) => {
                    
                    //create domains
                    const domains: Domain[] = await factory(Domain)().createMany(1,{domainId: domainId})
                    organization.domains = domains
                    return organization
                })
                .createMany(2)
                user.organizations = organizations
                return user
            })
            .create({ email: 'demo@domain.com' })

        //generate dmarcreports
        await factory(DmarcReport)().createMany(15,{ clientId: domainId })

    }
    
    
}