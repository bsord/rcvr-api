import { ObjectType, Field} from "type-graphql";

@ObjectType()
export class Subscription{
    @Field()
    id: string;

    @Field()
    created: number

    @Field(() => Number, {nullable:true})
    trial_start: number | null

    @Field(() => Number, {nullable:true})
    trial_end: number | null

    @Field()
    start_date: number

    @Field()
    status: string

}
