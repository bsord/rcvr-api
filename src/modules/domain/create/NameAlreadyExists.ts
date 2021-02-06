import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import { Domain } from "../../../entity/Domain";

@ValidatorConstraint({ async: true })
export class NameAlreadyExistsConstraint implements ValidatorConstraintInterface {

    validate(name: string) {
        return Domain.findOne({ where: { name } }).then(domain => {
            if (domain) return false;
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