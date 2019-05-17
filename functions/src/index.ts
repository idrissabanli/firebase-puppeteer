import * as functions from 'firebase-functions';
import {getBrowser} from './chromium'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const render = functions
  .runWith({ memory: '2GB', timeoutSeconds: 120 })
  .https.onRequest(async (request, response) => {

    // Pass a URL via a query param
    const requestURL = request.query.requestURL;

    const file = await getBrowser(async (page:any, browser:any) => {
      await page.goto(requestURL);
      const content = await page.screenshot();
      return content
    });

    // Send the response
    // response.status(200).send(content);
    response.statusCode = 200;
    response.setHeader('Content-Type', `image/png`);
    response.end(file);
 });
