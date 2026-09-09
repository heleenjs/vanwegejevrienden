// =============================
// UNDERCOVER BIJ DE POFIETSIE
// =============================

// 1. Plak hier straks de URL van jullie Google Apps Script Web App.
// Voorbeeld:
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzU1pxpu1w5l4pclWHBcwCtosqwR4rxr5FfXaBAdiZn7piUOHa6ZbVgk9hOazejb7oB/exec";
const SHEET_ENDPOINT = "";

const QUESTIONS = [
  { text: "Wat is de geheime code?", answer: "CPB&PGrtVgl" },
  { text: "Wat is de code van de koffer?", answer: "986" },
  { text: "Maak de zin af: vanwege ...", answer: "je vrienden" }
];

let current = 0;
const quizGate = document.getElementById("quizGate");
const site = document.getElementById("site");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answer = document.getElementById("answer");
const quizForm = document.getElementById("quizForm");
const quizMessage = document.getElementById("quizMessage");
const progressBar = document.getElementById("progressBar");

function showQuestion() {
  const q = QUESTIONS[current];
  questionTitle.textContent = `Vraag ${current + 1}`;
  questionText.textContent = q.text;
  answer.value = "";
  answer.focus();
  progressBar.style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const entered = answer.value.trim().toLowerCase();
  const expected = QUESTIONS[current].answer.trim().toLowerCase();

  if (entered !== expected) {
    quizMessage.textContent = "Helaas, dat antwoord klopt niet. Probeer het opnieuw.";
    answer.focus();
    return;
  }

  quizMessage.textContent = "";
  if (current < QUESTIONS.length - 1) {
    current++;
    showQuestion();
  } else {
    quizGate.classList.add("hidden");
    site.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
});

document.getElementById("signupForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.getElementById("signupMessage");
  const form = event.currentTarget;

  if (!SHEET_ENDPOINT) {
    message.textContent =
      "De aanmelding is ingevuld, maar de Google Sheet is nog niet gekoppeld. Voeg eerst de Apps Script-URL toe in app.js.";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());

  // Google Apps Script accepteert deze POST zonder dat we een externe server nodig hebben.
  // no-cors betekent dat de browser het antwoord niet kan uitlezen, maar de gegevens
  // worden wel naar de Google Sheet verstuurd.
  try {
    await fetch(SHEET_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });

    form.reset();
    message.textContent =
      "Aanmelding ontvangen! We hebben je gegevens doorgestuurd naar de organisatie.";
  } catch (error) {
    console.error(error);
    message.textContent =
      "Er ging iets mis bij het versturen. Probeer het nogmaals.";
  }
});

showQuestion();
