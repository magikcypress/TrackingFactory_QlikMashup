import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const tenantUrl = process.env.TENANT_URL;
const oauthClient = process.env.OAUTH_CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

import { auth, users } from "@qlik/api";

(async () => {
  await new Promise(r => setTimeout(r, 2000));

  auth.setDefaultHostConfig({
    host: tenantUrl,
    // authType: "Oauth2",
    clientId: oauthClient,
    redirectUri: redirectUri,
    accessTokenStorage: "session",
    autoRedirect: true,
  });

  const username = await users.getMyUser(auth);
  console.log(username.data.name)

  const userName = username.data.name;
  document.getElementById('userName').textContent = userName;

})();


