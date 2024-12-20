require('dotenv').config({ path: '.env' });

const projectName = process.env.PROJECT_NAME;
const tenantUrl = process.env.TENANT_URL;
const appId = process.env.APP_ID;
const webIntegrationId = process.env.WEB_INTEGRATION_ID;
const oauthClientId = process.env.OAUTH_CLIENT_ID;
const assistantId = process.env.ASSISTANT_ID;
const redirectUri = process.env.REDIRECT_URI;
const factoryAutomationId = process.env.FACTORY_AUTOMATION_ID;
const factoryAutomationKey = process.env.FACTORY_AUTOMATION_KEY;
const aiKey = process.env.AI_KEY;
const aiUri = process.env.AI_URI;
const aiModel = process.env.AI_MODEL;

module.exports = {
  plugins: {
    "posthtml-modules": {
      "root": "src",
      "input": "*.html",
      "output": "dist"
    },
    "posthtml-expressions": {
      locals: {
        "PROJECT_NAME": () => {
          return projectName;
        },
        "TENANT_URL": () => {
          return tenantUrl;
        },
        "APP_ID": () => {
          return appId;
        },
        "WEB_INTEGRATION_ID": () => {
          return webIntegrationId;
        },
        "OAUTH_CLIENT_ID": () => {
          return oauthClientId;
        },
        "ASSISTANT_ID": () => {
          return assistantId;
        },
        "REDIRECT_URI": () => {
          return redirectUri;
        },
        "FACTORY_AUTOMATION_ID": () => {
          return factoryAutomationId;
        },
        "FACTORY_AUTOMATION_KEY": () => {
          return factoryAutomationKey;
        },
        "AI_KEY": () => {
          return aiKey;
        },
        "AI_URI": () => {
          return aiUri;
        },
        "AI_MODEL": () => {
          return aiModel;
        }
      }
    }
  }
};
