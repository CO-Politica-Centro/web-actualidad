import { NextResponse } from "next/server";
import { getFirebaseConfig } from "@/lib/firebase/client";

export async function GET() {
  const config = getFirebaseConfig();
  if (!config) {
    return NextResponse.json({ configured: false }, { status: 200 });
  }

  return NextResponse.json({
    configured: true,
    config: {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
    },
  });
}
