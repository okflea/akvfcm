import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const postRequestSchema = z.object({
  firebaseId: z.string(),
  token: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const parsedBody = postRequestSchema.parse(body);

  if (!parsedBody) {
    return NextResponse.json(
      {
        error: "Invalid request body ",
      },
      { status: 400 },
    );
  }

  const data = parsedBody;
  const deviceName = req.headers.get("User-Agent");

  try {
    const userId = await db.user.findUnique({
      where: {
        firebaseId: data.firebaseId,
      },
      select: {
        id: true,
      },
    });

    const createdToken = await db.notificationToken.create({
      data: {
        User: {
          connect: {
            id: userId?.id,
          },
        },
        token: data.token,
        deviceId: deviceName!,
      },
    });

    return NextResponse.json({
      createdToken,
      message: "Notification Token created",
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { statusText: "Correct error type" },
        { status: 200 },
      );
    } else {
      console.log(error);
      return NextResponse.json(
        { statusText: "Error while creating token" },
        { status: 500 },
      );
    }
  }
}
