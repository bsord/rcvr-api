import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany} from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { User } from './User'
import { Domain } from './Domain'

@ObjectType()
@Entity()
export class Organization extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field({nullable:true})
    @Column({default: null})
    stripeCustomerId: string;

    @Field(()=> String , {nullable:true})
    @Column({default: null})
    stripeProductId: string 

    @Field({nullable:true})
    @Column({default: null})
    stripeSubscriptionId: string;

    @Field({nullable:true})
    @Column({default: null})
    stripeSubscriptionStatus: string;

    @Field(() => User, {nullable:true})
    @ManyToMany(() => User, user => user.organizations)
    members: User[];

    @Field(() => Domain, {nullable:true})
    @OneToMany(() => Domain, domain => domain.organization)
    domains: Domain[];
}