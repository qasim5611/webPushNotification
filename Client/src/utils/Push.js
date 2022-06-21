import API from "./../url";

const publicVapidKey =
  "BPcQiemsAeAbDOaReR2_FrWa_ein5LpXuOu9z2nmvUkVQYuv3J-AHHLlMRpBlByxviZf8DLqFGD6A0BcUZtVotM";

// const publicVapidKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function send(title = "Push Sent", message = "Hello push") {
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(function (registration) {
        if (!registration.pushManager) {
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) {
              registration.pushManager
                .subscribe({
                  applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  sendSubscription(newSubscription);
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                  } else {
                    console.error(e);
                  }
                });
            } else {
              sendSubscription(existedSubscription);
            }
          });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
}

function sendSubscription(subscription) {
  console.log('ok');
  return fetch(API + `/subscribe`, {
    method: "POST",
    body: JSON.stringify({
      subscription: subscription,
      title: "Notified by Precision Ordance",
      description: "someone buy a product",
      icon: "https://ichef.bbci.co.uk/news/976/cpsprodpb/9A50/production/_118740593_gettyimages-1231144196.jpg",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}