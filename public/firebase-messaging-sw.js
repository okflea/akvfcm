importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

// let link

const main = async () => {
  const response = await fetch("/api/headOffice/getFirebaseConfig", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // const response = axios.get("/api/headOffice/getFirebaseConfig", {headers:{'Content-Type': 'application'}})

  const data = await response.json();

  firebase.initializeApp(data.FirebaseCredentials);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    console.log("background", payload);
    // link = payload.data.link || null
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    // console.log("title", notificationTitle)
    // console.log("options", notificationOptions)

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    event.waitUntil(clients.openWindow(link));
  });
};

main();
