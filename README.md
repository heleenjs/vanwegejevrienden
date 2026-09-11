# Undercover bij de Pofietsie

Deze versie houdt de bestaande donkere/papieren layout en quiz intact en repareert de teller en de aanmeldkoppeling.

## Bestanden
- `index.html` — website
- `style.css` — bestaande styling + kleine uitbreidingen
- `app.js` — quiz, countdown en verzending naar Google Sheets
- `google-apps-script.gs` — Apps Script endpoint voor Google Sheets

## 1. Google Sheet koppelen
1. Maak/open de Google Sheet waarin de aanmeldingen moeten komen.
2. Ga naar **Extensies → Apps Script**.
3. Plak de inhoud van `google-apps-script.gs`.
4. Kies **Implementeren → Nieuwe implementatie**.
5. Type: **Web-app**.
6. Uitvoeren als: **Ik**.
7. Wie heeft toegang: **Iedereen**.
8. Implementeer en kopieer de URL die eindigt op `/exec`.
9. Open `app.js` en vervang `PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE` door die URL.
10. Upload daarna alle websitebestanden opnieuw.

De kolomkoppen worden automatisch aangemaakt op tabblad `Aanmeldingen`.

## 2. Countdown
De teller telt af naar **14 november 2026 om 16:00 Nederlandse tijd**. De functie wordt nu ook daadwerkelijk gestart.

## 3. Betaling
De website gebruikt het aangeleverde ING-betaalverzoek voor **€199**. Er is geen QR-code meer.

## 4. Foto
De aangeleverde biker/punkerfoto wordt als hero-afbeelding gebruikt en staat ook in de voorbereiding.

## 5. Quiz
De drie bestaande vragen en antwoorden zijn niet inhoudelijk aangepast:
- `CPB&PGrtVgl`
- `986`
- `je vrienden`
