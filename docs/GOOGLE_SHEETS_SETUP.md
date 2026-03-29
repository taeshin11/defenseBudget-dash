# Google Sheets Webhook Setup

This guide explains how to set up the Google Sheets webhook that collects comparison data from DefenseBudget Dash.

## Steps

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
   - Name it "DefenseBudget Dash — Analytics"
   - Add headers in Row 1: `Timestamp | Countries | Metric | User Agent | Referrer`

2. **Open Apps Script**
   - In the spreadsheet, go to **Extensions → Apps Script**
   - Delete any default code in the editor

3. **Paste the Script**
   - Copy the contents of `docs/google-apps-script.js` into the Apps Script editor
   - Save the project (Ctrl+S)

4. **Deploy as Web App**
   - Click **Deploy → New Deployment**
   - Click the gear icon and select **Web app**
   - Set:
     - Description: "DefenseBudget Dash Webhook"
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click **Deploy**
   - Authorize the script when prompted

5. **Copy the URL**
   - After deployment, copy the **Web app URL**
   - It will look like: `https://script.google.com/macros/s/XXXX.../exec`

6. **Configure the App**
   - Create a `.env.local` file in the project root (if it doesn't exist)
   - Add: `NEXT_PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX.../exec`
   - Restart the dev server

## Testing

1. Open the Compare page
2. Select some countries and click "Compare"
3. Check your Google Sheet — a new row should appear with the comparison data

## Notes

- The webhook fires silently — it never blocks the user experience
- If the webhook URL is not set, the POST is simply skipped
- Data collected: countries compared, metric used, timestamp, user agent, referrer
