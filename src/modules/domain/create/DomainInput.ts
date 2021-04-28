import { Length} from "class-validator";
import { InputType, Field } from "type-graphql";
import { NameAlreadyExists } from "./NameAlreadyExists";

@InputType()
export class DomainInput {

    @Field()
    @Length(1,255)
    @NameAlreadyExists({message: "Name already in use"})
    name: string;

    @Field()
    @Length(1,255)
    organizationId: string;

    @Field()
    defensive: boolean;

}