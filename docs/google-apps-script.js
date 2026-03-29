/**
 * Google Apps Script — DefenseBudget Dash Webhook
 *
 * This script receives POST requests from the Compare tool
 * and logs the data to a Google Sheet.
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Deploy → New Deployment → Web App → Anyone (anonymous)
 * 5. Copy the deployment URL
 * 6. Set NEXT_PUBLIC_SHEETS_WEBHOOK_URL in .env.local
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.countries.join(', '),
      data.metric,
      data.userAgent || '',
      data.referrer || ''
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
