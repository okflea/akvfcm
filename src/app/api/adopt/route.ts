import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { pushNotifications } from "~/lib/pushNoifications";
import { db } from "~/server/db";

const postSchema = z.object({
  animalId: z.string(),
  sourceEmail: z.string(),
  heroName: z.string(),
});
export async function POST(req: NextRequest) {
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

    const { animalId, sourceEmail, heroName } = parsedBody;
    const user = await db.user.findUnique({
      where: {
        email: sourceEmail,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "sourceEmail not found" },
        { status: 404 },
      );
    }
    await pushNotifications({
      title: `Animal ${animalId} has been adopted`,
      description: `${heroName} has adopted the animal with id ${animalId}`,
      sourceUserId: user?.id,
    });

    return NextResponse.json(
      { message: "adopted and notified everyone", success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "some error occured" },
      { status: 500 },
    );
  }
}
