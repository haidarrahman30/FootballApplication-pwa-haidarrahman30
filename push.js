var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BMzLBN47faSoxI6wBTk78JXJTLZoe4Kd96oy8bK6qVOu32LXl8-e70YJmeA41ZXMZ3SjjP-fBOBdCByyemoDMAw",
    "privateKey": "kdO8sVHpghSbMjpZAoV2OMTjBwprtDyD3vzHfuOLzck"
};

webPush.setVapidDetails(
    'mailto:haidarrahmans30@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fYlcsXck4mk:APA91bFtt-gcu2tPQyMKqI6Ni7qClZL8jCK9U8jbamy5dItw8kUw7KOaNf563B90qm0MgVN0stKj2gNFcCU93NOcP1SqTYvqAnweJg72sGIwdSQose6Ta0OxDFFSZ401u6rwdERQWE9N",
    "keys": {
        "p256dh": "BGpjk+LrdPrvZaziwaqJk++DJUXG332YR2SUE8OxadwqEfONG9tWT6gZ1w3YKb8f5bpDaABtZ9S8Uc6p7bVkv+U=",
        "auth": "rGTI/9XKdSsKEaW6rBjHbg=="
    }
};
var payload = 'Welcome Footballers, Enjoy GetTheBall';

var options = {
    gcmAPIKey: '340122452248',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);