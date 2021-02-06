import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, PrimaryColumn} from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Organization } from './Organization'
@ObjectType()
@Entity()
export class Domain extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @PrimaryColumn('varchar', { length: 12 })
    domainId: string;

    @Field()
    @Column()
    name: string;

    @Field(() => Organization, {nullable:true})
    @ManyToOne(() => Organization, organization => organization.domains)
    organization: Organization;

}