//import { Min } from "class-validator";
import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class PasswordInput {
    @Field()
    @Length(8,16)
    password: string;
}