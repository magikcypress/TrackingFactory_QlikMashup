import { auth, qix, users, reports, tempContents } from "https://cdn.jsdelivr.net/npm/@qlik/api@1/index.min.js";
import fileSaver from 'https://cdn.jsdelivr.net/npm/file-saver@2.0.5/+esm'

const vizEl = document.getElementById("qeData");
const appId = vizEl.getAttribute("app-id");
const refApi = await vizEl.getRefApi();
const doc = await refApi.getDoc();
const theObject = await refApi.getObject();
const objLayout = await theObject.getLayout();

auth.setDefaultHostConfig({
    host: "qfp.eu.qlikcloud.com",
    // authType: "Oauth2",
    clientId: "f50b3042e90bcdd929be4a957af91fb1",
    redirectUri: "https://127.0.0.1:1235/oauth_callback.html",
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
    fileSaver.saveAs(dle.data, `${createFileName(wait.filename)}.xlsx`);       
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
  
