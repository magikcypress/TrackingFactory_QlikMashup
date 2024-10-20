import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const tenantUrl = process.env.TENANT_URL;
const oauthClient = process.env.OAUTH_CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

import { auth, reports, tempContents, reports, tempContents } from "@qlik/api";
import { saveAs } from 'file-saver';

const vizEl = document.getElementById("qeData");
const appId = vizEl.getAttribute("app-id");
const refApi = await vizEl.getRefApi();
const doc = await refApi.getDoc();
const theObject = await refApi.getObject();
const objLayout = await theObject.getLayout();

auth.setDefaultHostConfig({
    host: tenantUrl,
    authType: "Oauth2",
    clientId: oauthClient,
    redirectUri: redirectUri,
    accessTokenStorage: "session",
    autoRedirect: true,
});

document.getElementById("exportData")
    .addEventListener("click", async function() {
    exportData(doc, objLayout);
    });

async function exportData(doc, objLayout) {

    const tempB = await doc.createTemporaryBookmark(
    {
        qOptions: {
        qIncludeAllPatches: true,
        qIncludeVariables: true,
        qSaveVariableExpressions: true
        },
        qObjectIdsToPatch: [
        objLayout.qInfo.qId
        ]
    }
    );

    const reportPayload = {
    type: "sense-data-1.0",
    meta: {
        exportDeadline:"P0Y0M0DT0H8M0S",
        tags:["qlik-embed-download"]
    },
    senseDataTemplate: {
        appId: appId,
        id: objLayout.qInfo.qId,
        selectionType: "temporaryBookmarkV2",
        temporaryBookmarkV2: {
        id: tempB
        }
    },
    output: {
        outputId: "Chart_excel",
        type:"xlsx"}
    }

    try {
    showLoader();
    const reportReq = await reports.createReport(reportPayload);
    let statusURL = reportReq.headers.get("content-location");
    const reportId = extractReportId(statusURL);
    if (!reportId) {
        throw new Error("Invalid report ID");
    }
    // Set interval to check status every 5 seconds
    const wait = await waitUntil(reportId);
    const downloadId = getDownloadId(wait.location);
    let dle = await tempContents.downloadTempFile(downloadId, {inline: 1});
    hideLoader();
    saveAs.saveAs(dle.data, `${createFileName(wait.filename)}.xlsx`);
    } catch (err) {
        console.log(err);
    }
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}
// Function to create a filename
function createFileName(additionalInfo) {
    const currentDateTime = new Date().toISOString();
    return `${additionalInfo}-${currentDateTime}`;
}

async function waitUntil(reportId) {
    return await new Promise(resolve => {
    const interval = setInterval(() => {
        return reports.getReportStatus(reportId).
        then((status) => {
            console.log(status);
            console.log(`Current status: ${status.data.status}`);
            if (status.data.status === "done") {
            console.log(status);
            let result = {
                location: status.data.results[0].location,
                filename: status.data.results[0].outputId,
            };
            clearInterval(interval);
            resolve(result);

            };
        });

    }, 5000);
    });
}

function extractReportId(url) {
    const regex = /reports\/(.*?)\/status/;
    const match = url.match(regex);
    if (match && match[1]) {
    return match[1];
    }
    return null;
}

function getDownloadId(url) {
    // Define a regular expression to match the last part of the path
    const regex = /\/([^\/?#]+)(?:[?#]|$)/;

    // Execute the regular expression on the URL
    const matches = url.match(regex);
    // Return the matched string, or null if no match is found
    return matches ? matches[1] : null;
}

