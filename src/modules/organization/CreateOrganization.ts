import { Resolver, Mutation, Arg, UseMiddleware} from "type-graphql";
import { Organization } from "../../entity/Organization";
import { OrganizationInput } from "./create/OrganizationInput";
import { logger } from "../middleware/logger";


@Resolver()
export class CreateOrganizationResolver {

  @UseMiddleware(logger)

  @Mutation(() => Organization)
  async createOrganization(
      //Handle Arguments/inputs
      @Arg("data") {name}: OrganizationInput
  ): Promise<Organization> {
    //Function for handling resolver

    const org = await Organization.create({
        name
    }).save()


    return org
  }

}

