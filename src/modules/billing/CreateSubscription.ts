import { Resolver, Mutation, Arg } from "type-graphql";
import {Subscription } from "./create/SubscriptionTypes"
import Stripe from 'stripe';
import { Organization } from "../../entity/Organization";

const stripe = new Stripe('sk_test_QcDnPrJQNxCs0200eCzknx2X00N1HpkVXq', {
    apiVersion: '2020-08-27',
    typescript: true
  });

function addDays(date:Date, days:number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

@Resolver()
export class CreateSubscriptionResolver {
  @Mutation(() => Subscription, { nullable: true })
  async createSubscription(
      @Arg("customerId") customerId: string,
      @Arg("paymentMethodId") paymentMethodId: string,
      @Arg("priceId") priceId: string,
      @Arg("organizationId") organizationId: string,
  ): Promise<Subscription | null> {
    console.log(paymentMethodId)
    try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });
      } catch (error) {
        throw new Error(error.message)
      }

      await stripe.customers.update(
        customerId,
        {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        }
      );
    
    const trialDays:number = 15
    const todaysDate:Date = new Date()
    const trialEndDate:Date = addDays(todaysDate, trialDays)
    const trialEndDateMillis:number = Math.floor(trialEndDate.getTime() /1000)
    
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        trial_end: trialEndDateMillis,
        expand: ['latest_invoice.payment_intent'],
    });

    // Update org with new subscription info
    await Organization.update(organizationId, {
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
      stripeProductId: subscription.items.data[0].price.product as string
    })

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