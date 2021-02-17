import { Resolver, Query, Arg } from "type-graphql";
import {Subscription } from "./create/SubscriptionTypes"
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_QcDnPrJQNxCs0200eCzknx2X00N1HpkVXq', {
    apiVersion: '2020-08-27',
    typescript: true
  });

@Resolver()
export class GetSubscriptionResolver {
  @Query(() => Subscription, { nullable: true })
  async getSubscription(
      @Arg("subscriptionId") subscriptionId: string,
  ): Promise<Subscription | null> {

    // Create the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    let response: Subscription = {
      created: subscription.created,
      trial_start: subscription.trial_start,
      trial_end: subscription.trial_end,
      start_date: subscription.start_date,
      status: subscription.status,
      id: subscription.id
    }
    return response
  }

}