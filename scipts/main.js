const keyboard = document.querySelector(".keyboard");
const hangmangImg = document.querySelector(".hangman-box img");
const wordDistplay = document.querySelector(".word-distplay");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord;
let wrongGuessCount;
let correctLetters;
const maxGuesses = 6;

const initGame = (button, clickedLetter) => {
  console.log(button, clickedLetter);
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDistplay.querySelectorAll("li")[index].innerText = letter;
        wordDistplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmangImg.src = `img/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

const wordList = [
  {
    word: "yasrib",
    hint: "Payg'ambar Muhammad (s.a.v) kelishidan oldin Madina shahrining nomi qanday bo'lgan",
  },
  {
    word: "abdulloh",
    hint: "Payg'ambar Muhammad (s.a.v) otasining ismi nima?",
  },
  {
    word: "ali",
    hint: "Payg'ambar Muhammad (s.a.v)ning eng suyukli kuyovlarining ismi nima?",
  },
  {
    word: "ansorlar",
    hint: "Payg'ambar Muhammad (s.a.v)ning Madinalik sahobalari qanday nomlanganlar?",
  },
  {
    word: "makka",
    hint: "Payg'ambar Muhammad (s.a.v) qaysi shaharda dunyoga kelganlar?",
  },
  {
    word: "omina",
    hint: "Payg'ambar Muhammad (s.a.v) onasining ismi nima?",
  },
  {
    word: "sofiya",
    hint: "Payg'ambar Muhammad (s.a.v) ammasining ismi nima?",
  },
  {
    word: "jabroil",
    hint: "Payg'ambar Muhammad (s.a.v)ga tahorat olishni va namoz o'qishni kim o'rgatgan?",
  },
  {
    word: "madina",
    hint: "Payg'ambar Muhammad (s.a.v) qaysi shaharda vafot etdi?",
  },
  {
    word: "bilol",
    hint: "Payg'ambar Muhammad (s.a.v) muazzinlari kim bo'lgan?",
  },
  {
    word: "bomdod",
    hint: "Payg'ambar Muhammad (s.a.v) kunning qaysi vaqtida tug'ilganlar?",
  },
  {
    word: "arab",
    hint: "Payg'ambar Muhammad (s.a.v)ning millatlari nima bo'lgan?",
  },
  {
    word: "hoshimiy",
    hint: "Payg'ambar Muhammad (s.a.v) qaysi urug'dan bo'lgan?",
  },
  {
    word: "quraysh",
    hint: "Payg'ambar Muhammad (s.a.v) qaysi qabiladan bo'lgan?",
  },
  {
    word: "abdulmutalib",
    hint: "Payg'ambar Muhammad (s.a.v) bobolarining ismi nima?",
  },
  {
    word: "alaq",
    hint: "Payg'ambar Muhammad (s.a.v)ga birinchi nozil bo'lgan oyatlar qaysi surada kelgan?",
  },
];

const resetGame = () => {
  wrongGuessCount = 0;
  correctLetters = [];
  wordDistplay.innerHTML = currentWord
    .split("")
    .map(() => '<li class="letter"></li>')
    .join("");
  gameModal.classList.remove("show");
  hangmangImg.src = `img/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false)
};
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `Siz to'g'ri javobni topdingiz: `
      : `To'g'ri javob: `;
    gameModal.querySelector("img").src = `img/${
      isVictory ? "victory" : "lost"
    }.gif `;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Tabriklaymiz!" : "Yutqazdingiz!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
