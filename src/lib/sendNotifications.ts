import { initAdmin } from "~/firebase/admin";
import { db } from "~/server/db";

type notificationTokenType = {
  id: string;
  userId: string;
  deviceId: string;
  token: string;
  createdAt: Date;
};

type projectUsersType = {
  NotificationTokens: {
    id: string;
    userId: string;
    deviceId: string;
    token: string;
    createdAt: Date;
  }[];
  id: string;
  email: string;
}[];

export async function sendNotificationToUsers({
  title,
  body,
  sourceUserId,
  projectUsers,
}: {
  title: string;
  body?: string;
  sourceUserId?: string;
  projectUsers: projectUsersType;
}) {
  try {
    if (projectUsers.length === 0) {
      return "failed";
    }

    // sending notification using firebase messaging
    const tokensToSendNotification: string[] = [];
    projectUsers?.forEach(
      (user: { id: string; NotificationTokens: notificationTokenType[] }) => {
        // if (sourceUserId && sourceUserId === user.id) return null;
        user.NotificationTokens.forEach((token) => {
          tokensToSendNotification.push(token.token);
        });
      },
    );

    // const oneMontheAgo = new Date();
    // oneMontheAgo.setMonth(oneMontheAgo.getMonth() - 1);
    // projectUsers?.forEach(
    //   (user: { id: string; NotificationTokens: notificationTokenType[] }) => {
    //     // if (sourceUserId && sourceUserId === user.id) return null
    //     user.NotificationTokens.forEach((token) => {
    //       const date = new Date(token.createdAt);
    //       if (date >= oneMontheAgo && token.token !== undefined) {
    //         tokensToSendNotification.push(token.token);
    //       }
    //     });
    //   },
    // );

    const response = await (await initAdmin())
      .messaging()
      .sendEachForMulticast({
        tokens: tokensToSendNotification,
        notification: {
          title,
          body,
        },
      });

    if (response.failureCount > 0) {
      const failedTokens = response.responses
        .map((res, index) =>
          res.success ? null : tokensToSendNotification[index],
        )
        .filter((token) => token !== null);

      const tokensToDelete = failedTokens.map(async (token) => {
        if (!token) return null;

        try {
          return await db.notificationToken.deleteMany({
            where: {
              token,
            },
          });
        } catch (error) {
          console.error(`Error fetching token ${token}:`, error);
          return null;
        }
      });

      await Promise.all(tokensToDelete);
    }

    return "success";
  } catch (err) {
    console.log("error in notifying, ", err);
    return "failed";
  }
}
