let points = 0;
let timeLeft = 30;
let timerInterval;
let progressInterval;
let comboStreak = 0;
let comboStreakActive = false;
let skipAvailable = true;
let freezeAvailable = true;
let popupActive = false;
let questionStartTime = 0;

const questions = [
  {
    question: "Does the dog ___ the tin can?",
    correct: "chase",
    options: ["chase", "eat", "see"],
  },
  {
    question: "The cat ___ on the tree.",
    correct: "climbs",
    options: ["climbs", "runs", "sits"],
  },
  {
    question: "The bird ___ in the sky.",
    correct: "flies",
    options: ["flies", "sings", "hops"],
  },
  {
    question: "Does the mouse ___ the cheese?",
    correct: "eat",
    options: ["eat", "run", "chase"],
  },
  {
    question: "The fish ___ in the water.",
    correct: "swims",
    options: ["swims", "flies", "dives"],
  },
  {
    question: "The quick brown fox ___ over the lazy dog.",
    correct: "jumps",
    options: ["jumps", "rolls", "bends"],
  },
  {
    question: "Chai tea? Chai means '___,' my friend!",
    correct: "tea",
    options: ["tea", "mocha", "cappuccino"],
  },
  {
    question: "Can you say sandwich in Spanish? ___!",
    correct: "bocadillo",
    options: ["bocadillo", "zorra", "sándwich"],
  },
  {
    question: "I'm on a seafood diet. I ___ food and I eat it.",
    correct: "see",
    options: ["see", "cook", "buy"],
  },
  {
    question:
      "Why don’t scientists trust atoms? Because they ___ everything up.",
    correct: "make",
    options: ["make", "blow", "mix"],
  },
  {
    question:
      "I told my friend she was drawing her eyebrows too high. She looked ___.",
    correct: "surprised",
    options: ["surprised", "angry", "confused"],
  },
  {
    question: "To be, or not to be, that is the ___. (Shakespeare)",
    correct: "question",
    options: ["question", "answer", "dilemma"],
  },
  {
    question: "The only thing we have to fear is ___ itself. (F. D. Roosevelt)",
    correct: "fear",
    options: ["fear", "failure", "danger"],
  },
  {
    question: "I think, therefore I ___. (Descartes)",
    correct: "am",
    options: ["am", "exist", "think"],
  },
  {
    question:
      "In the Harry Potter series, the spell to disarm an opponent is ___!",
    correct: "Expelliarmus",
    options: ["Expelliarmus", "Avada Kedavra", "Lumos"],
  },
  {
    question: "In Star Wars, Darth Vader famously says, 'I am your ___.'",
    correct: "father",
    options: ["father", "brother", "master"],
  },
  {
    question:
      "In The Lord of the Rings, Frodo is tasked with destroying the One ___.",
    correct: "Ring",
    options: ["Ring", "Sword", "Amulet"],
  },
];

let currentQuestion;

function allowDrop(event) {
  event.preventDefault();
}

function showPopup(message) {
  if (popupActive) return;
  popupActive = true;

  const popup = document.createElement("div");
  popup.style.position = "absolute";
  popup.style.top = "30%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -30%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  popup.style.color = "#fff";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "1.5rem";
  popup.style.zIndex = "9999";
  popup.innerText = message;
  popup.style.animation =
    "popupShake 0.5s ease-in-out, popupScale 0.3s ease-in-out";

  const style = document.createElement("style");
  style.innerHTML = `
          @keyframes popupShake {
            0% { transform: translate(-50%, -30%) rotate(0deg); }
            25% { transform: translate(-50%, -30%) rotate(-10deg); }
            50% { transform: translate(-50%, -30%) rotate(10deg); }
            75% { transform: translate(-50%, -30%) rotate(-10deg); }
            100% { transform: translate(-50%, -30%) rotate(0deg); }
          }

          @keyframes popupScale {
            0% { transform: translate(-50%, -30%) scale(0.8); }
            100% { transform: translate(-50%, -30%) scale(1); }
          }
        `;

  document.body.appendChild(popup);
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.removeChild(popup);
    document.head.removeChild(style);
    popupActive = false;
  }, 2500);
}

function randomPopupDistraction() {
  const messages = [
    "Hold on tight! Quick Question! 🧐",
    "Don't panic, just focus! 😅",
    "Uh-oh! Here comes a distraction! 😈",
    "Can you handle the pressure? 😏",
    "Time's ticking! Better hurry up! ⏰",
    "Oops! Did you forget that answer? 😜",
    "You sure about that? 🤔",
    "Focus, you’re doing great! ✨",
    "Keep going! You got this! 💪",
    "Quick! Show us what you've got! 💥",
    "Uh-oh, a tricky one! Better think fast! ⚡",
    "Haha, wrong answer! Better luck next time! 😂",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  showPopup(randomMessage);
}

setInterval(randomPopupDistraction, Math.random() * (20000 - 10000) + 10000);

function updateComboStreak(isCorrect) {
  const streakElement = document.getElementById("combo-streak");

  if (isCorrect) {
    comboStreak++;
    streakElement.innerText = `Combo Streak: ${comboStreak}`;
    streakElement.classList.add("combo-streak-active", "combo-streak-correct");
    streakElement.classList.remove("combo-streak-wrong");
  } else {
    comboStreak = 0;
    streakElement.innerText = `Combo Streak: 0`;
    streakElement.classList.add("combo-streak-active", "combo-streak-wrong");
    streakElement.classList.remove("combo-streak-correct");
  }

  setTimeout(() => {
    streakElement.classList.remove("combo-streak-active");
  }, 1000);
}

function createParticles(element) {
  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.setProperty("--x", `${Math.random() * 200 - 100}px`);
    particle.style.setProperty("--y", `${Math.random() * 200 - 100}px`);
    element.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }
}

function calculatePoints(timeTaken) {
  const maxPoints = 20;
  const minPoints = 5;

  const fastThreshold = 5000;

  if (timeTaken <= fastThreshold) {
    return maxPoints;
  } else {
    const penalty = Math.min((timeTaken - fastThreshold) / 1000, 10);
    return Math.floor(Math.max(maxPoints - penalty, minPoints));
  }
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);
  let dropzone = event.target;

  let optionText = data.replace("draggable-", "");
  if (optionText === currentQuestion.correct) {
    dropzone.innerText = optionText;
    dropzone.classList.add("correct");
    dropzone.classList.add("correct-text");
    createParticles(dropzone);
    points += calculatePoints(Date.now() - questionStartTime);
    updateComboStreak(true);
    if (comboStreak >= 3) {
      points += 10;
      playSound("combo");
    }
    document.getElementById("score").innerText = `Score: ${points}`;
    playSound("correct");
  } else {
    dropzone.innerText = "Wrong word!";
    dropzone.classList.add("wrong");
    dropzone.classList.add("incorrect-text");
    updateComboStreak(false);
    playSound("wrong");
  }

  setTimeout(nextQuestion, 1000);
}

function freezeTime() {
  if (freezeAvailable) {
    timeLeft += 10;
    freezeAvailable = false;
    document.getElementById("freeze-btn").disabled = true;
    alert("Time frozen! You got 10 extra seconds.");
  }
}

function skipQuestion() {
  if (skipAvailable) {
    nextQuestion();
    skipAvailable = false;
    document.getElementById("skip-btn").disabled = true;
    alert("Question skipped!");
  }
}

function nextQuestion() {
  freezeAvailable = true;
  skipAvailable = true;
  document.getElementById("freeze-btn").disabled = false;
  document.getElementById("skip-btn").disabled = false;

  let dropzone = document.getElementById("dropzone");
  dropzone.innerText = "Drop the word here";
  dropzone.classList.remove("correct", "wrong");

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question").innerText = currentQuestion.question;

  const shuffledOptions = shuffle([...currentQuestion.options]);
  const container = document.getElementById("draggable-container");
  container.innerHTML = "";
  shuffledOptions.forEach((option) => {
    let draggable = document.createElement("div");
    draggable.classList.add("draggable");
    draggable.id = `draggable-${option}`;
    draggable.draggable = true;
    draggable.innerText = option;
    draggable.addEventListener("dragstart", drag);
    container.appendChild(draggable);
  });

  resetTimer();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
  return array;
}

function startTimer() {
  questionStartTime = Date.now();
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Let's move to the next question.");
      nextQuestion();
    } else {
      timeLeft--;
      document.getElementById("time-left").innerText = timeLeft;
      updateProgressBar();
    }
  }, 1000);
}

function resetTimer() {
  timeLeft = 30;
  document.getElementById("time-left").innerText = timeLeft;
  clearInterval(timerInterval);
  updateProgressBar();
  startTimer();
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress");
  const progressPercentage = (timeLeft / 30) * 100;
  progressBar.style.width = progressPercentage + "%";
}

function playSound(type) {
  const audio = new Audio(
    type === "correct"
      ? "sounds/correct-sound.mp3"
      : type === "wrong"
      ? "sounds/wrong-sound.mp3"
      : type === "combo"
      ? "sounds/combo-sound.mp3"
      : "sounds/default-sound.mp3"
  );

  audio.play();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/Driflux/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);

        if (navigator.serviceWorker.controller) {
          console.log("Service Worker is already controlling the page.");
        } else {
          console.log("No service worker controlling the page.");
        }

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.log("New content is available; please refresh.");
                alert("A new version of Driflux is available. Please refresh the page to update.");
              } else {
                console.log("Content is cached for offline use.");
              }
            }
          };
        };

        navigator.serviceWorker.addEventListener("controllerchange", () => {
          console.log("Service Worker controller has changed. New content is available.");
          alert("A new version of Driflux is available. Please refresh the page to update.");
        });
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

function promptUpdate(registration) {
  if (registration.waiting) {
    if (confirm("New version available. Update now?")) {
      registration.waiting.postMessage({ action: "skipWaiting" });
    }
  }
}

navigator.serviceWorker.addEventListener("controllerchange", () => {
  console.log("New service worker controlling the page. Reloading to get the latest content...");
  window.location.reload();
});

document.getElementById("loading-screen").style.display = "flex";
setTimeout(() => {
  document.getElementById("loading-screen").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    nextQuestion();
  }, 500);
}, 2000);
