import {Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";

@ObjectType()
@Entity()
export class Organization extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @PrimaryColumn('varchar', { length: 12 })
    clientId: string;

    @Field()
    @Column()
    name: string;

}