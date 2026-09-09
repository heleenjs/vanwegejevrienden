// =============================
// UNDERCOVER BIJ DE POFIETSIE
// =============================

// 1. Plak hier straks de URL van jullie Google Apps Script Web App.
// Voorbeeld:
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzU1pxpu1w5l4pclWHBcwCtosqwR4rxr5FfXaBAdiZn7piUOHa6ZbVgk9hOazejb7oB/exec";

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


// Countdown Timer naar 14 november 2026 16:00
function startCountdown() {
  const targetDate = new Date("2026-11-14T16:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("countdownTimer").innerHTML = "<p style='color:#efbd5c;'>MISSIE IS GESTART!</p>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}


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
