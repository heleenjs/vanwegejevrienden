# Undercover bij de Pofietsie

Mobiele one-page website met een 3-staps quiz als toegangspoort en een aanmeldformulier.

## Bestanden
- `index.html` — structuur en content
- `style.css` — responsive ontwerp
- `app.js` — quizlogica, menu en koppeling met Google Sheets
- `google-apps-script.gs` — gratis Google Apps Script endpoint voor de aanmeldingen

## 1. Quiz-antwoorden aanpassen
Open `app.js` en wijzig:

```js
const QUESTIONS = [
  { text: "Wat is de geheime code?", answer: "GEHEIM" },
  { text: "Wat is de code van de koffer?", answer: "1234" },
  { text: "Maak de zin af: vanwege ...", answer: "DE MISSIE" }
];
```

Vervang de drie voorbeeldantwoorden door jullie echte antwoorden.

## 2. Google Sheet maken
1. Maak een nieuwe Google Sheet.
2. Geef hem bijvoorbeeld de naam `Undercover bij de Pofietsie`.
3. Ga naar `Extensies > Apps Script`.
4. Open `google-apps-script.gs` en kopieer de volledige inhoud.
5. Plak die in Apps Script.
6. Klik op **Opslaan**.
7. Kies **Implementeren > Nieuwe implementatie**.
8. Kies bij type **Web-app**.
9. Bij "Uitvoeren als" kies je **Ik**.
10. Bij "Wie heeft toegang" kies je **Iedereen**.
11. Klik **Implementeren** en geef de gevraagde toestemming.
12. Kopieer de URL die eindigt op `/exec`.

## 3. Website koppelen
Open `app.js` en verander:

```js
const SHEET_ENDPOINT = "";
```

naar:

```js
const SHEET_ENDPOINT = "JULLIE_GOOGLE_APPS_SCRIPT_URL";
```

Bijvoorbeeld:

```js
const SHEET_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
```

Daarna wordt iedere aanmelding automatisch toegevoegd aan het tabblad `Aanmeldingen`.

De sheet krijgt automatisch deze kolommen:
- Tijdstip
- Naam
- Aantal personen
- Aankomst
- Vertrek
- Vervoer
- Dieetwensen
- Wat drink je graag?

## 4. Online zetten
De website kan daarna gratis op GitHub Pages, Netlify of Cloudflare Pages worden geplaatst.

### Privacy
Omdat je naam, aankomst/vertrek en dieetwensen verzamelt, behandel de Google Sheet als privé en deel hem alleen met de organisatie. Verzamel alleen gegevens die jullie daadwerkelijk nodig hebben.
