importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCk2J0PWEnqxJJOJbRpYvWj2o8QT0XpqJI",
    authDomain: "movicoders-basketproject.firebaseapp.com",
    databaseURL: "https://movicoders-basketproject-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movicoders-basketproject",
    storageBucket: "movicoders-basketproject.firebasestorage.app",
    messagingSenderId: "869836237509",
    appId: "1:869836237509:web:cce39da28a77151964deac",
    measurementId: "G-5Q9TNYC2VJ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Recibiendo mensaje en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
