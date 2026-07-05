/**
 * 404 Collective — Survey Response Webhook (Google Apps Script)
 *
 * Deployment:
 * 1. Go to https://script.google.com → "New project"
 * 2. Paste this entire code into Code.gs
 * 3. Deploy → "Deploy as web app" → Target: "Web app"
 * 4. Execute as: "Me" → Who has access: "Anyone"
 * 5. Copy the URL and set it as NEXT_PUBLIC_SURVEY_ENDPOINT in Cloudflare Pages
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Write headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Source",
      "Screener Hours",
      "Too Expensive",
      "Too Cheap",
      "Getting Expensive",
      "Bargain",
      "Pain / Willingness to Pay",
      "Price Order (VW)",
      "Optimal Price",
      "Browser UA"
    ]);
  }

  var data = JSON.parse(e.postData.contents);
  var ua = e.parameter.useragent || "";
  var optimal = calcOptimal(
    safeNum(data.vwTooExpensive),
    safeNum(data.vwTooCheap),
    safeNum(data.vwGettingExpensive),
    safeNum(data.vwBargain)
  );

  sheet.appendRow([
    new Date(),
    data.source || "unknown",
    data.screenerHours || "",
    data.vwTooExpensive || "",
    data.vwTooCheap || "",
    data.vwGettingExpensive || "",
    data.vwBargain || "",
    data.painWorth || "",
    (data.priceOrder || []).join(", "),
    optimal,
    ua.substring(0, 200)
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MIME_TYPE.JSON);
}

function calcOptimal(tooExpensive, tooCheap, gettingExpensive, bargain) {
  var safeTooCheap = Math.min(tooCheap, tooExpensive - 1);
  var safeTooExpensive = Math.max(tooExpensive, tooCheap + 1);
  var core = (safeTooCheap + safeTooExpensive) / 2;
  return Math.round(Math.min(Math.max(core, bargain), gettingExpensive));
}

function safeNum(val) {
  if (val === "" || val === null || val === undefined) return 0;
  var n = parseInt(val);
  return isNaN(n) ? 0 : n;
}

// Helper to print the deployed URL for easy copy-paste
function getDeployUrl() {
  Logger.log(ScriptApp.getService().getUrl());
}
