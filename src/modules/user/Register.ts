import { Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { Organization } from "../../entity/Organization";
import { RegisterInput } from "./register/RegisterInput";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";


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
      @Arg("data") {firstName, lastName, email, password, organizationName}: RegisterInput
  ): Promise<User> {
    //Function for handling resolver
    const hashedPassword = await bcrypt.hash(password, 12);

    const org: Organization = await Organization.create({
      name: organizationName
    }).save()

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        organizations: [org]
    }).save()
    

    await sendEmail(email, await createConfirmationUrl(user.id), 'newuser')

    return user
  }

}