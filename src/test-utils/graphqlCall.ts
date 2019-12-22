import { graphql, GraphQLSchema } from "graphql"
import { createSchema } from "../utils/createSchema"
import Maybe from "graphql/tsutils/Maybe"

interface Options {
    source: string,
    variableValues?: Maybe<{
        [key: string]: any;
    }>,
    userId?: string,
    clientId?: string,
}

let schema: GraphQLSchema;

export const graphqlCall = async ({ source, variableValues, userId, clientId}: Options) => {
    if(!schema){
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    userId,
                    clientId
                }
            },
            res: {
                clearCooki: jest.fn()
            }
        }
    })
}