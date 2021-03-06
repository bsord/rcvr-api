import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, PrimaryColumn, BeforeInsert } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Organization } from './Organization'
import { Todo } from './Todo'
const generate = require('nanoid/generate')

@ObjectType()
@Entity()
export class Domain extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @PrimaryColumn('varchar', { length: 12 })
    domainId: string;

    @BeforeInsert()
    async generateDomainId(): Promise<void> {
        this.domainId = await generate("1234567890abcdef", 12);
    }

    @Field()
    @Column()
    name: string;

    @Field(() => Organization, { nullable: true })
    @ManyToOne(() => Organization, organization => organization.domains)
    organization: Organization;

    @Field()
    @Column({ default: 1 })
    domainScore: number;

    @Field()
    @Column({ default: "" })
    dmarcPolicy: string;

    @Field(() => Todo, {nullable:true})
    @OneToMany(() => Todo, todo => todo.domain)
    todos: Todo[];

    @Field()
    @Column({ default: false })
    defensive: boolean;

}