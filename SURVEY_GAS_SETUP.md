# 404 Collective — Survey-Speicherung (Google Apps Script → Google Sheets)

## Schritt-für-Schritt (5 Minuten)

1. **Öffne** https://script.google.com → "Neues Projekt"
2. **Lösche** den gesamten Code in `Code.gs` und ersetze ihn mit:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Header schreiben, falls leer
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Source", "Screener Hours",
      "Too Expensive", "Too Cheap", "Getting Expensive", "Bargain",
      "Pain/Worth", "Price Order", "Optimal Price", "Browser"
    ]);
  }
  
  var data = JSON.parse(e.postData.contents);
  var ua = e.parameter.useragent || "unknown";
  var optimal = calculateOptimal(data.vwTooExpensive, data.vwTooCheap, 
                                  data.vwGettingExpensive, data.vwBargain);
  
  sheet.appendRow([
    new Date(),
    data.source || "",
    data.screenerHours || "",
    data.vwTooExpensive || "",
    data.vwTooCheap || "",
    data.vwGettingExpensive || "",
    data.vwBargain || "",
    data.painWorth || "",
    data.priceOrder ? data.priceOrder.join(",") : "",
    optimal,
    ua.substring(0, 120) // truncated user agent
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MIME_TYPE.JSON);
}

function calculateOptimal(tooExpensive, tooCheap, gettingExpensive, bargain) {
  var safeTooCheap = Math.min(tooCheap, tooExpensive - 1);
  var safeTooExpensive = Math.max(tooExpensive, tooCheap + 1);
  var core = (safeTooCheap + safeTooExpensive) / 2;
  return Math.round(Math.min(Math.max(core, bargain), gettingExpensive));
}

// URL auslesen für den Link unten
function showUrl() {
  Logger.log(ScriptApp.getService().getUrl());
}
```

3. **Klicke** auf "Deploy" → "Als Web-Deployschversion veröffentlichen..."
4. **Einstellung:**
   - Beschreibung: `404 survey v1`
   - Ausführen als: **Mich**
   - Wer hat Zugriff: **Jeder** (wichtig!)
5. **Kopiere die URL** (z.B. `https://script.google.com/macros/s/AKfycbx.../exec`)
6. **Setze in Cloudflare Pages Settings:**
   - `NEXT_PUBLIC_SURVEY_ENDPOINT` = die kopierte URL

7. **Teste**: Survey auf der Website ausfüllen → Schauen ob Zeile in Google Sheets erscheint ✅

## Ergebnis

Alle Survey-Antworten landen sortiert nach Datum in deinem Google Sheet — einfach zu durchsuchen, exportierbar als CSV, automatisch wachsend.
