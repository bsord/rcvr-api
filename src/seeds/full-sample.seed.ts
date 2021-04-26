// create-pets.seed.ts
import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '../entity/User'
import { Organization } from '../entity/Organization'
import { Domain } from '../entity/Domain'
import { DmarcReport } from '../entity/DmarcReport'
import { Todo } from '../entity/Todo'

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<any> {

        //create user
        await factory(User)()
            .map(async (user: User) => {

                //create orgs
                const organizations: Organization[] = await factory(Organization)()
                .map(async (organization: Organization) => {
                    
                    //create domains
                    const domains: Domain[] = await factory(Domain)()
                    .map( async (domain: Domain) => {

                        //create todos for each domain
                        const todos: Todo[] =  await factory(Todo)().createMany(2, {action: "Add Dmarc Record", ref: "dmarc"})
                        domain.todos = todos
                        
                        return domain
                    })
                    .createMany(3)

                    // create dmarc records for each domain
                    domains.forEach( async domain => {
                        factory(DmarcReport)().createMany(500,{ clientId: domain.domainId })
                    })

                    
                    organization.domains = domains
                    organization.stripeCustomerId = 'cus_Ix9aLK4NNQigbl'
                    return organization
                })
                .createMany(2)
                user.organizations = organizations
                return user
            })
            .create({ email: 'demo@domain.com' })

        //generate dmarcreports
        

    }
    
    
}