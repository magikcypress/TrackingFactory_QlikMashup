# Tracking Factory

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

This is a [Qlik Sense mashup](https://qlik.dev/embed/foundational-knowledge/web-app-mashup-intro/) with Embed Objects. A Qlik Mashup demo for an industrial machine factory showcases real-time analytics, allowing users to track machine performance, production output, and maintenance schedules. With interactive dashboards, managers can quickly identify inefficiencies, optimize processes, and make data-driven decisions to improve operational efficiency.

## Getting Started

Before we get started, you'll need to install Node and npm (or Yarn).

### Contributing

Add .env file with parameter

```.env
PROJECT_NAME="Tracking Factory"
TENANT_URL="https://<tenant>.eu.qlikcloud.com"
APP_ID="<app_id>"
OAUTH_CLIENT_ID="<web_integration_id>"
ASSISTANT_ID="<assistant_id>"
REDIRECT_URI="<redirect_uri>"
FACTORY_AUTOMATION_ID="<factory_automation_id>",
FACTORY_AUTOMATION_TOKEN="<factory_automation_token>"
OPENAI_API_KEY="<open_api_key>"
```

Change in index.html file

```js
    <script
      crossorigin="anonymous"
      type="application/javascript"
      src="https://cdn.jsdelivr.net/npm/@qlik/embed-web-components"
      data-host="{{ TENANT_URL }}"
      data-client-id="{{ OAUTH_CLIENT_ID }}"
      data-redirect-uri="{{ REDIRECT_URI }}"
      data-access-token-storage="session"
      data-cross-site-cookies="true"
      data-auto-redirect="true"
    ></script>
```

#### Qlik Anwsers integration

```html
  <qlik-embed ui="ai/assistant" assistant-id="{{ ASSISTANT_ID }}" appearance="qlik-light"></qlik-embed>
```

#### Question with OpenAI

- How looks like the activity of my factory? in 3 charts please
- Which machine has the highest scrap rate?
- Let's produce a dashboard with : The production over the time, the % of scrap per machine and the correlation between % of scrap and risk of failure 
- do we see a correlation between the risk of failure and the scrap rate?
- What is the age of the captain?

#### Managing authO

OAuth2 is an authorization standard used by cloud applications to allow them to access resources on other web applications on behalf of a user. According to this blog on Auth0’s website: “OAuth 2.0 provides consented access and restricts actions of what the client app can perform on resources on behalf of the user, without ever sharing the user’s credentials.”

source : [OAuth Overview](https://qlik.dev/authenticate/oauth/)

## Installation Qlik mashup

Install package

```bash
npm install
```

Start a local server using:

```bash
npm run server
```

Start a dev on local machine using:

```bash
npm run dev
```

Check version npm package on package.json

```bash
npx npm-check-updates -u
```
