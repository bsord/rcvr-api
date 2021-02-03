import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import { Organization } from "../../../entity/Organization";

@ValidatorConstraint({ async: true })
export class NameAlreadyExistsConstraint implements ValidatorConstraintInterface {

    validate(name: string) {
        return Organization.findOne({ where: { name } }).then(organization => {
            if (organization) return false;
            return true;
        });
    }

}

export function NameAlreadyExists(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: NameAlreadyExistsConstraint
        });
   };
}