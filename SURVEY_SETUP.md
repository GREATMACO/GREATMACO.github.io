# 404 Collective — Daten-Erfassung (Waitlist + Survey)

## Übersicht
- **Waitlist Emails** → Buttondown Subscribers API (deine Key ist hinterlegt)
- **Survey Antworten** → Remote via Webhook an Google Sheets (kostenlos, über n8n oder Google Apps Script)

---

## 1. Waitlist — Buttondown API ✅ BEREITS KONFIGURIERT

Die Waitlist-Emails gehen automatisch in deine Buttondown Subscribers Liste.

**Konfiguriert in:**
- `.env.local` und `NEXT_PUBLIC_WAITLIST_ENDPOINT=https://buttondown.email/api/eps/subscribers?apikey=bd_eu1_a947d7ab-711d-40b9-b70c-836afea9c0db`

**Cloudflare Pages Settings:**
Gehe zu → Workers & Pages → 404collective-demo → Settings → Environment Variables
- `NEXT_PUBLIC_WAITLIST_ENDPOINT` = `https://buttondown.email/api/eps/subscribers?apikey=bd_eu1_a947d7ab-711d-40b9-b70c-836afea9c0db`

---

## 2. Survey — Remote Storage (WÄHLE EINE OPTION)

### Option A: Google Apps Script (einfachste Lösung, 10 min setup)
1. Gehe zu https://script.google.com → "New Project"
2. Ersetze den Code mit diesem:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Survey Responses");
  
  if (!sheet) {
    sheet = ss.insertSheet("Survey Responses");
    sheet.appendRow([
      "Timestamp", "Screener Hours", "Too Expensive", "Too Cheap",
      "Getting Expensive", "Bargain", "Pain/Worth", "Price Order"
    ]);
  }
  
  const priceOrder = Array.isArray(data.priceOrder) ? data.priceOrder.join(" | ") : data.priceOrder;
  sheet.appendRow([
    new Date(),
    data.screenerHours,
    data.vwTooExpensive,
    data.vwTooCheap,
    data.vwGettingExpensive,
    data.vwBargain,
    data.painWorth,
    priceOrder
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" })
  ).setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click → Deploy → New Deployment → Web App
4. Settings: Who can access = **Anyone**
5. Kopiere die URL (endet auf `/exec`)
6. Setze diese URL in Cloudflare Pages als `NEXT_PUBLIC_SURVEY_ENDPOINT`

### Option B: n8n.cloud (kostenlos, mehr Features)
1. Account erstellen unter https://n8n.io/cloud
2. Workflow erstellen mit HTTP-Trigger Node
3. Verbindung zu Google Sheets / Notion / Email
4. Webhook URL → Cloudflare Pages als `NEXT_PUBLIC_SURVEY_ENDPOINT`

---

## 3. Daten-Zugriff

### Waitlist Emails:
→ https://buttondown.email/account/subscribers (dein Buttondown Account)

### Survey Antworten:
→ Google Sheets (Option A) oder n8n Dashboard (Option B) — du kannst alle Ergebnisse sehen, exportieren, etc.
