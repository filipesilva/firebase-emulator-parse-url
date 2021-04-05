const functions = require('firebase-functions');
const admin = require('firebase-admin');
const adminApp = admin.initializeApp({
  databaseURL: "https://emulator-test-1.firebaseio.com/",
  credential: admin.credential.applicationDefault()
});

exports.posts = functions.https.onRequest(async (request, response) => {
  const db = admin.database();
  const ref = await db.ref('posts').push({
    date: new Date().toISOString()
  });
  response.send(`Added: ${ref}`);
});

exports.postsPushHandler = functions.database.ref('/posts/{postId}').onCreate(snapshot => {
  console.log("snapshot ref", snapshot.ref.toString())
  console.log("admin app options", adminApp.options)
  console.log("admin app db", adminApp.database())
});