import { Length} from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class OverviewInput {

    @Field()
    @Length(1,255)
    organizationId: string;

}