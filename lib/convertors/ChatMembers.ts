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
  collectionGroup,
  doc,
  query,
  where,
} from "firebase/firestore";

export interface ChatMembers {
  userId: string;
  email: string;
  timestamp: Date | null;
  isAdmin: boolean;
  chatId: string;
  image: string;
}

const chatMemberConverter: FirestoreDataConverter<ChatMembers> = {
  // when we push data to the firestore well'l push it in the form of a subscription
  toFirestore: (member: ChatMembers): DocumentData => {
    return {
      userId: member.userId,
      email: member.email,
      timestamp: member.timestamp,
      isAdmin: !!member.isAdmin,
      chatId: member.chatId,
      image: member.image,
    };
  },
  // the that we expect to pull out from db
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ChatMembers => {
    const data = snapshot.data(options);
    return {
      userId: snapshot.id,
      email: data.email,
      timestamp: data.timestamp,
      isAdmin: data.isAdmin,
      chatId: data.chatId,
      image: data.image,
    };
  },
};

export const addChatRef = (chatId: string, userId: string) =>
  doc(db, "chats", chatId, "members", userId).withConverter(
    chatMemberConverter
  );

// For a specfic chat get memebers
export const chatMembersRef = (chatId: string) =>
  collection(db, "chats", chatId, "members").withConverter(chatMemberConverter);

// For a chat get the specific admi member
export const chatMemberAdminRef = (chatId: string) =>
  query(
    collection(db, "chats", chatId, "members"),
    where("isAdmin", "==", true)
  ).withConverter(chatMemberConverter);

// To generate all chat list for a member or user
export const chatMembersCollectionGroupRef = (userId: string) =>
  query(
    collectionGroup(db, "members"),
    where("userId", "==", userId)
  ).withConverter(chatMemberConverter);

// Normally when we pull from firebase there is no type saftey so this way pull and push to firebase doubles as a type safe way
