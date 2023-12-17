import { getServerSessionCustom } from "@/auth";
import { adminDb } from "@/firebase-admin";
import { chatMemberAdminRef } from "@/lib/convertors/ChatMembers";
import { getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { chatId } = await req.json();
  const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
    (doc) => doc.id
  )[0];
  const session = await getServerSessionCustom();
  if (!session || session?.user?.id !== adminId) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const ref = adminDb.collection("chats").doc(chatId);
  const bulkWriter = adminDb.bulkWriter();
  const MAX_RETRY_ATTEMPTS = 5;
  bulkWriter.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    } else {
      console.log("Failed write at document: ", error.documentRef.path);
      return false;
    }
  });
  try {
    await adminDb.recursiveDelete(ref, bulkWriter);
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Promise rejected: ", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}