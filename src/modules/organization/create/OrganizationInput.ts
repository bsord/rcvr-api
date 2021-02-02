import { Length} from "class-validator";
import { InputType, Field } from "type-graphql";
import { NameAlreadyExists } from "./NameAlreadyExists";

@InputType()
export class OrganizationInput {

    @Field()
    @Length(1,255)
    @NameAlreadyExists({message: "Name already in use"})
    name: string;

}