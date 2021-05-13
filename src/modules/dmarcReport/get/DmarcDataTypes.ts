
import { ObjectType, Field} from "type-graphql";

@ObjectType()
export class DmarcGraphData{
    @Field()
    date: Date;

    @Field()
    passes: number;

    @Field()
    fails: number;

    @Field()
    rejects: number;

}

@ObjectType()
export class DmarcSummaryData{
    @Field()
    totalProcessed: number;

    @Field()
    delivered: number;

    @Field()
    rejected: number;

    @Field()
    dmarcPassed: number;

    @Field()
    dmarcFailed: number;

    @Field()
    dkimPassed: number;

    @Field()
    dkimFailed: number;

    @Field()
    spfPassed: number;

    @Field()
    spfFailed: number;
}

@ObjectType()
export class DmarcTableData{
    @Field()
    provider: string;

    @Field()
    sourceIp: string;

    @Field()
    hostname: string; //reverse dns lookup of source ip

    @Field()
    dmarcResult: string

    @Field()
    volume: number; //total count of messages summed from this source ip

    @Field()
    spfDomain: string; //count of all reports that have dmarcDKIM passes

    @Field()
    spfResult: string; //count of all reports that have spfDKIM passes

    @Field()
    spfAlignment: string; //count of all reports that have spfDKIM passes

    @Field()
    dkimDomain: string; //count of all reports that have dmarcDKIM passes

    @Field()
    dkimResult: string; //count of all reports that have spfDKIM passes

    @Field()
    dkimAlignment: string; //count of all reports that have spfDKIM passes

    @Field()
    blockedCount: number; //count of all reports that have disposition of 'reject'

}

@ObjectType()
export class DmarcUsageData{
    @Field()
    total: number;

    @Field(() => DmarcUsageBreakdownData, {nullable:true})
    breakdown: DmarcUsageBreakdownData[]
}

@ObjectType()
export class DmarcUsageBreakdownData{
    @Field()
    clientId: string;

    @Field()
    volume: number

}