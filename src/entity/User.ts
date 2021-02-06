import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Organization } from "./Organization"

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent: User ): string {
        return `${parent.firstName} ${parent.lastName}`
    }

    @Field()
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column('bool', {default: false})
    confirmed: boolean;

    @Field(() => Organization, {nullable:true})
    @ManyToMany(() => Organization, organization => organization.members, {cascade: true})
    @JoinTable()
    organizations: Organization[];

}