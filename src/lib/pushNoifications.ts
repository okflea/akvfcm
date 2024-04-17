import { db } from "~/server/db";
import { sendNotificationToUsers } from "./sendNotifications";

export const pushNotifications = async ({
  title,
  description,
  sourceUserId,
}: {
  title: string;
  description: string;
  sourceUserId?: string;
}) => {
  const projectUsers = await db.user.findMany({
    select: {
      id: true,
      NotificationTokens: true,
      email: true,
    },
  });

  console.log("project users: ", projectUsers);

  // let userEmails: string[] = []
  // projectUsers.forEach((user:any) => {
  //   userEmails.push(user.email)
  // })

  // console.log("user emails", userEmails)

  await sendNotificationToUsers({
    title: "PurchaseOrder placed successfully",
    body: "PurchaseOrder placed",
    sourceUserId: sourceUserId,
    projectUsers,
  });

  // put the notification in the DB
  try {
    const notification = await db.notification.create({
      data: {
        title,
        description,
        UserId: sourceUserId || "",
      },
    });

    console.log("success");
    return "success";
  } catch (error) {
    console.log("error", error);
    return "error";
  }
};
