
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const request = require('request');

const tenantUrl = process.env.TENANT_URL;
const factoryAutomationId = process.env.FACTORY_AUTOMATION_ID;
const factoryAutomationToken = process.env.FACTORY_AUTOMATION_TOKEN;

  export default class qlikCallAutomation {

    constructor() { console.log('constructor . .. '); }

    async runFactoryTaskAssignment(body) {
      // send body
      try {

        var options = {
          'method': 'POST',
          'url': `${tenantUrl}/api/v1/automations/${factoryAutomationId}/actions/execute`,
          'headers': {
            'X-Execution-Token': `${factoryAutomationToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        };

        request(options, function (error, res) {
          if (error) throw new Error(error);
          console.log(res.body);
        });

    } catch (error) {
      console.error(`Erreur lors de l'appel à l'Automation: ${error.message}`);
    }
  }
}
