import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinTable} from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Domain } from "./Domain"

@ObjectType()
@Entity()
export class Todo extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    action: string;

    @Field()
    @Column()
    ref: string;

    @Field(() => Domain, {nullable:true})
    @ManyToOne(() => Domain, domain => domain)
    @JoinTable()
    domain: Domain;

}