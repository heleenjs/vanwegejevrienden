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

    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tijdstip", "Aanmelding", "Naam", "Aantal personen", "Aankomst",
        "Vertrek", "Vervoer", "Vervoermiddel", "Dieetwensen", "Wat drink je graag?"
      ]);
    }

    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    sheet.appendRow([
      new Date(),
      data.aanmelding || "",
      data.name || "",
      data.people || "",
      data.arrival || "",
      data.departure || "",
      data.transport || "",
      data.transportType || "",
      data.diet || "",
      data.drinks || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
