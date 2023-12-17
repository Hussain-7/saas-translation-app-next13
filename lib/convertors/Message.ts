// Convertor are responsible for how we push and pull data in our database
// so in this case for subscription wee push data to firestore

import { db } from "@/firebase";
import { LanguagesSupported } from "@/store/store";
import { Subscription } from "@/types/Subscription";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  collectionGroup,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Message {
  id?: string;
  input: string;
  timestamp: string;
  user: User;
  translated?: {
    [K in LanguagesSupported]?: string;
  };
}

const messageConvertor: FirestoreDataConverter<Message> = {
  // when we push data to the firestore well'l push it in the form of a subscription
  toFirestore: (message: Message): DocumentData => {
    return {
      input: message.input,
      timestamp: message.timestamp,
      user: message.user,
      // translated: message.translated,
    };
  },
  // the that we expect to pull out from db
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      input: data.input,
      timestamp: data.timestamp,
      translated: data.translated,
      user: data.user,
    };
  },
};

export const messagesRef = (chatId: string) =>
  collection(db, "chats", chatId, "messages").withConverter(messageConvertor);

// For a specfic chat get memebers
export const limitedMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), limit(25));

export const sortedMessageRef = (chatId: string) =>
  query(messagesRef(chatId), orderBy("timestamp", "asc"));

export const limitedSortedMessagesRef = (chatId: string) =>
  query(query(messagesRef(chatId), limit(1)), orderBy("timestamp", "desc"));
