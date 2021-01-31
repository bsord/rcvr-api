
import Faker from 'faker'
import { User } from "../entity/User";
import { define } from 'typeorm-seeding'
import bcrypt from 'bcryptjs';

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)
    const clientId = "1234567890"
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const email = "Demo3@domain.com"
    const password = "demo"
    const confirmed = true

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.clientId = clientId
    user.password = bcrypt.hashSync(password, 12);
    user.email = email
    user.confirmed = confirmed

    return user
  })
