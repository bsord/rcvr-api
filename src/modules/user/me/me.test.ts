import { testConn } from "../../../test-utils/testConn"
import { Connection } from "typeorm";
import faker from 'faker';
import { graphqlCall } from "../../../test-utils/graphqlCall";
import {redis} from '../../../redis';
import { User } from "../../../entity/User";

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
    if (redis.status == "end") {
      await redis.connect();
    }
})
afterAll(async () => {
    await conn.close()
    redis.disconnect();
})

const meQuery = `
{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;
describe('Me', ()=>{
    it("get user", async () => {
        
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save()



        const response = await graphqlCall({
            source: meQuery,
            userId: user.id

        });
      
        console.log(response)
        expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    name: user.firstName + " " + user.lastName
                }
            }
        })
        
    })

    it('returns null', async () => {
        const response = await graphqlCall({
            source: meQuery,
        });
      
        console.log(response)
        expect(response).toMatchObject({
            data: {
                me: null
            }
        })
    })
})