import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class DmarcReport extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Field()
    @Column()
    processedTime: Date;

    @Field()
    @Column()
    msgHash: string;

    @Field()
    @Column()
    clientId: string;

    @Field()
    @Column()
    orgName: string;

    @Field()
    @Column()
    dmarcDomain: string;

    @Field()
    @Column()
    sourceIp: string;

    @Field()
    @Column({default:"NA"})
    provider: string;

    @Field()
    @Column({default:"NA"})
    hostname: string;

    @Field()
    @Column()
    sourceCount: number;

    @Field()
    @Column()
    disposition: string;

    @Field()
    @Column()
    dmarcSpf: string;

    @Field()
    @Column()
    dmarcDkim: string;
    
    @Field()
    @Column()
    headerFrom: string;
    
    @Field()
    @Column()
    dkimDomain: string;

    @Field()
    @Column()
    dkimResult: string;
 
    @Field()
    @Column()
    spfDomain: string;
    
    @Field()
    @Column()
    spfResult: string;

    @Field({nullable:true})
    sum: string;

}