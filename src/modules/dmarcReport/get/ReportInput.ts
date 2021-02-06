import { Length} from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class ReportInput {

    @Field()
    @Length(1,255)
    domainId: string;

}