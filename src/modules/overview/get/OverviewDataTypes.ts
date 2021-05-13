
import { ObjectType, Field, Root} from "type-graphql";
import { Domain } from "../../../entity/Domain";

@ObjectType()
export class OverviewGraphData{
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
export class OverviewTableData{
    @Field()
    provider: string;

    @Field()
    sourceIp: string;

    @Field()
    hostname: string; //reverse dns lookup of source ip

    @Field()
    providerASNOrg: string; //reverse dns lookup of source ip

    @Field()
    countryCode: string; //reverse dns lookup of source ip

    @Field()
    compliant(@Root() parent: OverviewTableData ): boolean {
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

    @Field()
    domain: string; //dmarcDomain

}

@ObjectType()
export class OverviewScoreData{

    @Field()
    score: number;

    @Field()
    activeDomains: number;

    @Field()
    defensiveDomains: number;

}

@ObjectType()
export class OverviewProgressData{

    @Field()
    progressPercent: number;

    @Field()
    domain: string;

    @Field()
    id: string;

    @Field()
    domainScore: number;

}

@ObjectType()
export class OverviewTodoData{

    @Field()
    action: string;

    @Field()
    ref: string;

    @Field()
    domain: Domain;

}

@ObjectType()
export class OverviewSummaryData{
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