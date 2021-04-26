import { buildSchema } from "type-graphql"
import { ChangePasswordResolver } from "../modules/user/ChangePassword"
import { ConfirmUserResolver } from "../modules/user/ConfirmUser"
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword"
import { LoginResolver } from "../modules/user/Login"
import { LogoutResolver } from "../modules/user/Logout"
import { MeResolver } from "../modules/user/Me"
import { RegisterResolver } from "../modules/user/Register"

import { GetReportsResolver } from "../modules/dmarcReport/GetReports"
import { GetMyReportsResolver } from "../modules/dmarcReport/GetMyReports"
import { GetGraphDataResolver } from "../modules/dmarcReport/GetGraphData"
import { GetTableDataResolver } from "../modules/dmarcReport/GetTableData"
import { GetSummaryDataResolver } from "../modules/dmarcReport/GetSummaryData"
import { GetUsageDataResolver } from "../modules/dmarcReport/GetUsageData"

import { CreateOrganizationResolver } from "../modules/organization/CreateOrganization"
import { MyOrganizationsResolver } from "../modules/organization/MyOrganizations"
import { CreateDomainResolver } from "../modules/domain/CreateDomain"
import { GetDomainsResolver } from "../modules/domain/GetDomains"
import { DeleteDomainResolver } from "../modules/domain/DeleteDomain"

import { CreateSubscriptionResolver } from "../modules/billing/CreateSubscription"
import { GetSubscriptionResolver } from "../modules/billing/GetSubscription"
import { GetDmarcStatusResolver } from "../modules/tools/DmarcLookup"
import { ScoreDomainResolver } from "../modules/domain/ScoreDomain"

import { GetOverviewGraphDataResolver } from "../modules/overview/GetOverviewGraphData"
import { GetOverviewTableDataResolver } from "../modules/overview/GetOverviewTableData"
import { GetOverviewScoreDataResolver } from "../modules/overview/GetOverviewScoreData"
import { GetOverviewProgressDataResolver } from "../modules/overview/GetOverviewProgressData"
import { GetOverviewTodoDataResolver } from "../modules/overview/GetOverviewTodoData"
import { GetOverviewSummaryDataResolver } from "../modules/overview/GetOverviewSummaryData"

export const createSchema = () => buildSchema({
    resolvers: [
        ChangePasswordResolver,
        ConfirmUserResolver,
        ForgotPasswordResolver,
        LoginResolver,
        LogoutResolver,
        MeResolver,
        RegisterResolver,
        GetReportsResolver,
        GetMyReportsResolver,
        GetGraphDataResolver,
        GetTableDataResolver,
        GetSummaryDataResolver,
        CreateOrganizationResolver,
        MyOrganizationsResolver,
        CreateDomainResolver,
        GetDomainsResolver,
        DeleteDomainResolver,
        GetUsageDataResolver,
        CreateSubscriptionResolver,
        GetSubscriptionResolver,
        GetDmarcStatusResolver,
        ScoreDomainResolver,
        GetOverviewGraphDataResolver,
        GetOverviewTableDataResolver,
        GetOverviewScoreDataResolver,
        GetOverviewProgressDataResolver,
        GetOverviewTodoDataResolver,
        GetOverviewSummaryDataResolver
    ],
    authChecker: ({ context: { req } }) => {
        // return true if located, else return false
        return !!req.session.userId //bool
    }
})