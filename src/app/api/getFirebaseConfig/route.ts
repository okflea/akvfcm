import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try {
    const FirebaseCredentials = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    return NextResponse.json({ FirebaseCredentials }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "some error occured" },
      { status: 500 },
    );
  }
}
