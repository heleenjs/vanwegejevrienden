/**
 * UNDERCOVER BIJ DE POFIETSIE
 * Google Apps Script voor het opslaan van aanmeldingen in Google Sheets.
 *
 * Gebruik:
 * 1. Maak een nieuwe Google Sheet.
 * 2. Ga naar Extensies > Apps Script.
 * 3. Verwijder de voorbeeldcode en plak deze code.
 * 4. Sla op.
 * 5. Kies Implementeren > Nieuwe implementatie.
 * 6. Selecteer "Web-app".
 * 7. Uitvoeren als: "Ik".
 * 8. Wie heeft toegang: "Iedereen".
 * 9. Implementeer en kopieer de URL die eindigt op /exec.
 * 10. Plak die URL in app.js bij SHEET_ENDPOINT.
 */

const SHEET_NAME = "Aanmeldingen";

function doGet() {
  return ContentService
    .createTextOutput("Undercover bij de Pofietsie - aanmeldendpoint actief.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // Maak de kolomkoppen automatisch bij de eerste aanmelding.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tijdstip",
        "Naam",
        "Aantal personen",
        "Aankomst",
        "Vertrek",
        "Vervoer",
        "Dieetwensen",
        "Wat drink je graag?"
      ]);
    }

    const data = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.people || "",
      data.arrival || "",
      data.departure || "",
      data.transport || "",
      data.diet || "",
      data.drinks || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: String(error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
