import { Length, IsEmail} from "class-validator";
import { InputType, Field } from "type-graphql";
import { EmailAlreadyExists } from "./EmailAlreadyExists";
import { PasswordInput } from "../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput{
    @Field()
    @Length(1,255)
    firstName: string;

    @Field()
    @Length(1,255)
    lastName: string;

    @Field()
    @IsEmail()
    @EmailAlreadyExists({message: "Email already in use"})
    email: string;

}