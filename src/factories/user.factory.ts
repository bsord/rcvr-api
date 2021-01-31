
import Faker from 'faker'
import { User } from "../entity/User";
import { define } from 'typeorm-seeding'
import bcrypt from 'bcryptjs';
const generate = require('nanoid/generate')

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)
    const clientId = generate("1234567890abcdef", 12)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const email = faker.internet.email()
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
