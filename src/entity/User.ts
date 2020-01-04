import {Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @PrimaryColumn('varchar', { length: 12 })
    clientId: string;

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
    @Column()
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column('bool', {default: false})
    confirmed: boolean;

}