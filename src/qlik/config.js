/**
 * Config file: change the parameters according to your integration scenario
 */
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const tenantUrl = process.env.TENANT_URL;
const oauthClient = process.env.OAUTH_CLIENT_ID;
const appId = process.env.APP_ID;
const factoryAutomationId = process.env.FACTORY_AUTOMATION_ID;
const factoryAutomationToken = process.env.FACTORY_AUTOMATION_TOKEN;

module.exports = {
    tenantHostname: tenantUrl,
    oauthClient: oauthClient,
    appId: appId,
    factoryAutomationId: factoryAutomationId,
    factoryAutomationToken: factoryAutomationToken
}
