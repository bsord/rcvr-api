import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';
import { createSchema } from "./utils/createSchema";
import bodyParser from 'body-parser';


const main = async () => {
    await createConnection();

    const schema = await createSchema();
    console.log("test");
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        introspection: true //enable playground outside, disable in prod!
    }) as any
    
    const app = Express();
    app.use(cors({
        origin: "https://"+ process.env.CORS_ORIGIN,
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
    app.get('/healthz', (req, res) => {
        console.log(req.hostname)
        res.send('im alive');
    });
    // Set your secret key. Remember to switch to your live secret key in production!
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    const Stripe = require('stripe');
    const stripe = Stripe('sk_test_QcDnPrJQNxCs0200eCzknx2X00N1HpkVXq');

    app.post(
        '/stripe-webhook',
        bodyParser.raw({ type: 'application/json' }),
        async (req, res) => {
            console.log('received event');
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;

            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    req.headers['stripe-signature'],
                    process.env.STRIPE_WEBHOOK_SECRET
                );
            } catch (err) {
                console.log(err);
                console.log(`⚠️  Webhook signature verification failed.`);
                console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
                return res.sendStatus(400);
            }
            // Extract the object from the event.
            //const dataObject = event.data.object;

            // Handle the event
            // Review important events for Billing webhooks
            // https://stripe.com/docs/billing/webhooks
            // Remove comment to see the various objects sent for this sample
            switch (event.type) {
            case 'invoice.paid':
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate limits.
                break;
            case 'invoice.payment_failed':
                // If the payment fails or the customer does not have a valid payment method,
                //  an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.
                break;
            case 'customer.subscription.deleted':
                if (event.request != null) {
                // handle a subscription cancelled by your request
                // from above.
                } else {
                // handle subscription cancelled automatically based
                // upon your subscription settings.
                }
                break;
            default:
                // Unexpected event type
            }
            res.sendStatus(200);
        }
    );


    app.listen(4000, () => {
        console.log("Server started")
    });
}

main()
