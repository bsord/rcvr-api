import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';
import { createSchema } from "./utils/createSchema";


const main = async () => {
    await createConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        introspection: true //enable playground outside, disable in prod!
    })
 
    const app = Express();
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        
    }))

    const RedisStore = connectRedis(session);
    
    app.use(session({
        store: new RedisStore({
          client: redis,
        }),
        name: "qid",
        secret: "S3ssionS3cret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
    }));

    apolloServer.applyMiddleware({app, cors: false, path: '/api'})

    // Handle livenessProbe
    app.get('/healthz', (res) => {
        res.send('ok');
    });

    app.listen(4000, () => {
        console.log("Server started")
    });
}

main()
