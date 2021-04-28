
import { ObjectType, Field} from "type-graphql";
import { Domain } from "../../../entity/Domain";

@ObjectType()
export class DomainProgressData{

    @Field()
    progressPercent: number;

    @Field()
    domain: string;

    @Field()
    id: string;

    @Field()
    domainScore: number;

}

@ObjectType()
export class DomainScoreData{

    @Field()
    domain: string;

    @Field()
    id: string;

    @Field()
    domainScore: number;

    @Field()
    dmarcPolicy: string;

}

@ObjectType()
export class DomainTodoData{

    @Field()
    action: string;

    @Field()
    ref: string;

    @Field()
    domain: Domain;

}