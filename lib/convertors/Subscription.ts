// Convertor are responsible for how we push and pull data in our database
// so in this case for subscription wee push data to firestore

import { db } from "@/firebase";
import { Subscription } from "@/types/Subscription";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
} from "firebase/firestore";

const subscriptionConverter: FirestoreDataConverter<Subscription> = {
  // when we push data to the firestore well'l push it in the form of a subscription
  toFirestore: (subscription: Subscription): DocumentData => {
    return {
      ...subscription,
      // created: subscription.created,
      // current_period_start: subscription.current_period_start,
      // current_period_end: subscription.current_period_end,
    };
  },
  // the that we expect to pull out from db
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Subscription => {
    const data = snapshot.data(options);
    const sub: Subscription = {
      id: snapshot.id,
      cancel_at_period_end: data.cancel_at_period_end,
      created: data.created,
      current_period_start: data.current_period_start,
      items: data.items,
      latest_invoice: data.latest_invoice,
      metadata: data.metadata,
      payment_method: data.payment_method,
      price: data.price,
      prices: data.prices,
      product: data.product,
      quantity: data.quantity,
      status: data.status,
      stripeLink: data.stripeLink,
      cancel_at: data.cancel_at,
      canceled_at: data.canceled_at,
      current_period_end: data.current_period_end,
      ended_at: data.ended_at,
      trial_start: data.trial_start,
      trial_end: data.trial_end,
      role: data.role,
    };
    return sub;
  },
};

export const subscriptionRef = (userId: string) =>
  collection(db, "customer", userId, "subscriptions").withConverter(
    subscriptionConverter
  );
