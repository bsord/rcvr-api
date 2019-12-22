
import { ObjectType, Field, Root} from "type-graphql";

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
    compliant(@Root() parent: DmarcTableData ): boolean {
        if(parent.dkimPassCount/parent.volume > .9 || parent.spfPassCount/parent.volume > .9) {return true} else {return false}
    }

    @Field()
    volume: number; //total count of messages summed from this source ip

    @Field()
    dkimPassCount: number; //count of all reports that have dmarcDKIM passes

    @Field()
    spfPassCount: number; //count of all reports that have spfDKIM passes

    @Field()
    blockedCount: number; //count of all reports that have disposition of 'reject'

}