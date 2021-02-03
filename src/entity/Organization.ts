import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany} from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { User } from './User'
@ObjectType()
@Entity()
export class Organization extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field(() => User, {nullable:true})
    @ManyToMany(() => User, user => user.organizations)
    members: User[];

}