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
                        
                        
                        return domain
                    })
                    .createMany(3)

                    // create dmarc records for each domain
                    domains.forEach( async domain => {

                        let todos = [] as Todo[]
                        switch (domain.domainScore){
                            case 1:
                                todos.push(await factory(Todo)().create({action: "Add Dmarc Record", ref: "dmarc"}))
                                break;
                            case 2:
                                todos.push(await factory(Todo)().create({action: "Set DMARC record to @rcvr.io", ref: "dmarc"}))
                                todos.push(await factory(Todo)().create({action: "Change 'all' Spf directive to be '~All'", ref: "spf"}))
                                break;
                            case 3:
                                todos.push(await factory(Todo)().create({action: "Change DMARC policy to 'quarantine'", ref: "dmarc"}))
                                todos.push(await factory(Todo)().create({action: "Conslidate spf records with include statements", ref: "spf"}))
                                break;
                            case 4:
                                todos.push(await factory(Todo)().create({action: "Enforce DMARC with reject policy", ref: "dmarc"}))
                                break;
                            case 5:
                                todos.push(await factory(Todo)().create({action: "Add BIMI record", ref: "dmarc"}))
                                break;
                        }
                        domain.todos = todos
                        domain.save()

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