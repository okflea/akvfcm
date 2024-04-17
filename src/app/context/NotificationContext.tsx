"use client";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Messaging,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import axios from "axios";
import firebase_app from "~/firebase/config";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { env } from "~/env";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  //   let messaging: Messaging

  useEffect(() => {
    const messaging = getMessaging(firebase_app);
    onMessage(messaging, (payload) => {
      console.log("payload in message", payload);
      toast(`${payload.notification?.title}`, {
        className: "my-classname",
        description: payload.notification?.body,
        duration: 5000,
        icon: <MessageCircle />,
      });
      // toast({
      //   title: payload.notification?.title,
      //   description: payload.notification?.body,
      // })
    });
    if (!isAuthenticated || typeof window === "undefined") {
      return;
    }
    const getNotification = async () => {
      await navigator.serviceWorker
        .register("/firebase-messaging-sw.js", {
          scope: "/",
        })
        .then(async (registration) => {
          const permission = await Notification.requestPermission();
          let fcmToken;
          console.log("vapid", env.NEXT_PUBLIC_FCM_VAPID_KEY);

          if (permission === "granted") {
            await getToken(messaging, {
              serviceWorkerRegistration: registration,
              vapidKey: env.NEXT_PUBLIC_FCM_VAPID_KEY,
            })
              .then((currentToken) => {
                if (currentToken) {
                  fcmToken = currentToken;
                } else {
                  console.log(
                    "No registration token available. Request permission to generate one.",
                  );
                }
              })
              .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
              });
          }
          console.log("fcmToken", fcmToken);
          if (!fcmToken || !user?.firebaseId) {
            return;
          }
          const body = {
            firebaseId: user?.firebaseId,
            token: fcmToken,
          };
          localStorage.setItem("firebaseToken", fcmToken);
          await axios
            .post("/api/storeFcmToken", body, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              console.log("An error occured", err);
            });
        })
        .catch((err) => {
          console.log("An error occured", err);
        });
    };

    getNotification().catch((err) => {
      console.log("An error occured", err);
    });
  }, [isAuthenticated]);

  return <>{children}</>;
}
