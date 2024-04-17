import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const postSchema = z.object({
  firebaseId: z.string(),
  name: z.string(),
  email: z.string(),
  imageUrl: z.string(),
});
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const parsedBody = postSchema.parse(body);
    if (!parsedBody) {
      return NextResponse.json(
        {
          error: "Invalid request body ",
        },
        { status: 400 },
      );
    }
    const { firebaseId, name, email, imageUrl } = parsedBody;
    let user = await db.user.findUnique({
      where: {
        firebaseId,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          firebaseId,
          name,
          email,
          imageUrl,
        },
      });
    }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "some error occured" },
      { status: 500 },
    );
  }
}
