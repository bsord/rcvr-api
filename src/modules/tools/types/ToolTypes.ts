import { ObjectType, Field} from "type-graphql";

@ObjectType()
export class DmarcStatus{

    @Field()
    record: string

    @Field()
    policy: string

    @Field()
    domain: string

}
