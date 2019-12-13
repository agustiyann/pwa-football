var webPush = require('web-push');
 
const vapidKeys = {
  "publicKey": "BGMx5n7VyNvjLeCE9YYMUn07So_H70rjxuPhQYCkApX17IL3HuFg0UXyLWe2inr0kalgQb1sGcVZnaYS7Mj4iNM",
  "privateKey": "4_Txm-ZBkoucpxZcLPSj2FPCRndlqDcQ4M6P-KapOnw"
};
 
webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/d7JpBanqh-g:APA91bEWulpXpUviHrDSVuOsemRx3x7zOFUB8fL6rivqxrg_R107T5vXM_Cf1X66E6S6jgf58CsUkmmy7jjxO9vTiEkW9XeXoMBUwBUU09qwY_ygL_ETN9f-xsdp_JynG9swozhgioav",
  "keys": {
    "p256dh": "BJnYIe7/vDWt2wBn1yzGgwhqt0NjZZjQ6zORZCQCZzO5b4zcCH/fYJCmsTGpeD524qkY59T8hvkW+wLdsRE2zio=",
    "auth": "3Jre3IhWxbTkNaMVUyz9/g=="
  }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
  gcmAPIKey: '814586194592',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);