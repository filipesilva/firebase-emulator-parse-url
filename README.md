# firebase-emulator-parse-url

It's currently not possible to access the data snapshot reference when using RTDB via firebase functions.

I believe this is due to the check in https://github.com/firebase/firebase-js-sdk/blob/6af4c27743372ba531e8ce3d046ae2f81e8f5be1/packages/database/src/core/util/libs/parser.ts#L86. 
That piece of code checked that `parsedUrl.domain` is `localhost`, but it seems to be `emulator-test-1.localhost` instead.

This is a reproduction for https://github.com/firebase/firebase-tools/issues/TBD.

## Reproduction steps:

```
git clone https://github.com/filipesilva/firebase-emulator-parse-url
cd firebase-emulator-parse-url
yarn
yarn emulators
# open http://localhost:5001/emulator-test-1/us-central1/posts in the browser
```

You should see the following error log in the console:
```
i  functions: Beginning execution of "posts"
i  functions: Finished "posts" in ~1s
i  functions: Beginning execution of "postsPushHandler"
>  [2020-07-22T15:31:37.082Z]  @firebase/database: FIREBASE FATAL ERROR: Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com
!  functions: Error: FIREBASE FATAL ERROR: Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com
    at fatal (D:\sandbox\firebase-emulator-parse-url\node_modules\@firebase\database\dist\index.node.cjs.js:341:11)
    at parseRepoInfo (D:\sandbox\firebase-emulator-parse-url\node_modules\@firebase\database\dist\index.node.cjs.js:1296:9)
    at RepoManager.databaseFromApp (D:\sandbox\firebase-emulator-parse-url\node_modules\@firebase\database\dist\index.node.cjs.js:14990:25)ex.node.cjs.js:14990:25)                                                                                           e.cjs.js:15389:45)
    at Object.initStandalone (D:\sandbox\firebase-emulator-parse-url\node_modules\@firebase\database\dist\index.nod\database.js:67:23)e.cjs.js:15389:45)                                                                                                 :232:24)
    at DatabaseService.getDatabase (D:\sandbox\firebase-emulator-parse-url\node_modules\firebase-admin\lib\databaseoviders\database.js:293:34)\database.js:67:23)
    at FirebaseApp.database (D:\sandbox\firebase-emulator-parse-url\node_modules\firebase-admin\lib\firebase-app.js:132:23):232:24)                                                                                                           573:20
    at DataSnapshot.get ref [as ref] (D:\sandbox\firebase-emulator-parse-url\node_modules\firebase-functions\lib\providers\database.js:293:34)
    at D:\sandbox\firebase-emulator-parse-url\functions\index.js:17:24
    at cloudFunction (D:\sandbox\firebase-emulator-parse-url\node_modules\firebase-functions\lib\cloud-functions.js:132:23)
    at D:\sandbox\firebase-emulator-parse-url\node_modules\firebase-tools\lib\emulator\functionsEmulatorRuntime.js:573:20
!  Your function was killed because it raised an unhandled error.
```