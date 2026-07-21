const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("countdown-message");
const surpriseBtn = document.getElementById("surpriseBtn");
const typedLetterEl = document.getElementById("typedLetter");

function getNextBirthday() {
  const now = new Date();
  const target = new Date(now.getFullYear(), 6, 22, 0, 0, 0); // July 22

  if (target < now) {
    target.setFullYear(now.getFullYear() + 1);
  }

  return target;
}

function getRemainingUnits(target, now) {
  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

function updateCountdown() {
  const target = getNextBirthday();
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    yearsEl.textContent = "00";
    monthsEl.textContent = "00";
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    messageEl.textContent = "It’s your special day — happy 19th birthday, my love!";
    return;
  }

  const units = getRemainingUnits(target, now);

  yearsEl.textContent = String(units.years).padStart(2, "0");
  monthsEl.textContent = String(units.months).padStart(2, "0");
  daysEl.textContent = String(units.days).padStart(2, "0");
  hoursEl.textContent = String(units.hours).padStart(2, "0");
  minutesEl.textContent = String(units.minutes).padStart(2, "0");
  secondsEl.textContent = String(units.seconds).padStart(2, "0");

  messageEl.textContent = `Only ${units.years} years, ${units.months} months, ${units.days} days, ${units.hours} hours, ${units.minutes} minutes, and ${units.seconds} seconds until your beautiful birthday!`;
}

function createConfetti() {
  const colors = ["#ff70b8", "#ffd18a", "#9b6cff", "#fff", "#b3f1ff"];
  const sparkles = document.querySelector(".sparkles");

  for (let i = 0; i < 60; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${3 + Math.random() * 3}s`;
    piece.style.animationDelay = `${Math.random() * 1.5}s`;
    sparkles.appendChild(piece);
  }
}

function createFloatingHearts() {
  const body = document.body;
  for (let i = 0; i < 12; i += 1) {
    const heart = document.createElement("div");
    heart.className = "heart-pop";
    heart.textContent = "♡";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    heart.style.animationDelay = `${Math.random() * 1.2}s`;
    body.appendChild(heart);
  }
}

function showSurprise() {
  const pop = document.createElement("div");
  pop.className = "surprise-pop";
  pop.innerHTML = `
    <div class="message">
      <h3>My sweetest surprise 💗</h3>
      <p>You are the reason my days feel brighter, my smiles feel softer, and my heart feels fuller. Happy 19th birthday, my love.</p>
    </div>
  `;

  document.body.appendChild(pop);
  pop.addEventListener("click", () => pop.remove());
}

function typeLetter() {
  const text = `My dearest love,

Happy 19th birthday to the most beautiful girl in my world. You make every moment sweeter, every smile brighter, and every day feel magical. I hope this year brings you endless happiness, gentle laughter, and beautiful dreams that come true.

You are my favorite person, my sweetest thought, and the reason my heart feels so full. I will always be grateful for you, and I will always wish the very best for you on this special day and every day after.

With all my love,
Your forever person`;

  let index = 0;
  typedLetterEl.textContent = "";

  const typingInterval = setInterval(() => {
    typedLetterEl.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      clearInterval(typingInterval);
    }
  }, 25);
}

surpriseBtn.addEventListener("click", showSurprise);

updateCountdown();
setInterval(updateCountdown, 1000);
createConfetti();
createFloatingHearts();
typeLetter();
