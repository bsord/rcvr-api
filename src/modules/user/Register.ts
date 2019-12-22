import { Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
const generate = require('nanoid/generate')

@Resolver()
export class RegisterResolver {

  @UseMiddleware(logger)
  @Query(() => String, { nullable: true })
  async hello() {
    return "Hello world"
  }

  @Mutation(() => User)
  async register(
      //Handle Arguments/inputs
      @Arg("data") {firstName, lastName, email, password}: RegisterInput
  ): Promise<User> {
    //Function for handling resolver
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        clientId: generate("1234567890abcdef", 12),
        firstName,
        lastName,
        email,
        password: hashedPassword
    }).save()
    

    await sendEmail(email, await createConfirmationUrl(user.id), 'newuser')

    return user
  }

}