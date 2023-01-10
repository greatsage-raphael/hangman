const readline = require('readline');

const word = "javascript";
let hiddenWord = "";
const maxGuesses = 6;
let remainingGuesses = maxGuesses;
let guessedLetters = new Set();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function initializeHiddenWord() {
  hiddenWord = word.split("").map(letter => "_").join(" ");
}

function updateHiddenWord(letter) {
  const regex = new RegExp(letter, 'g');
  hiddenWord = hiddenWord.split(" ").join("").replace(regex, letter);
}

function checkGuess(letter) {
    if (guessedLetters.has(letter)) {
      console.log(`You already guessed "${letter}"`);
    } else if (word.includes(letter)) {
      updateHiddenWord(letter);
      console.log(`Correct! "${letter}" is in the word.`);
    } else {
      remainingGuesses--;
      console.log(`Incorrect! "${letter}" is not in the word.`);
    }
    guessedLetters.add(letter);
    if (gameOver()) {
      rl.close();
    }
  }
  
  function gameOver() {
    if (remainingGuesses === 0) {
      console.log(`You lose! The word was "${word}".`);
      return true;
    } else if (!hiddenWord.includes("_")) {
      console.log(`Congratulations! You guessed the word "${word}" correctly!`);
      return true;
    } else {
      return false;
    }
  }
  
function playGame() {
  initializeHiddenWord();
  console.log(`Welcome to hangman!\nGuess the word: ${hiddenWord}\nYou have ${remainingGuesses} guesses remaining.`);

  rl.question("Guess a letter: ", letter => {
    checkGuess(letter);
    console.log(`Guess the word: ${hiddenWord}\nYou have ${remainingGuesses} guesses remaining.`);
    if (!gameOver()) {
      playGame();
    } else {
      rl.close();
    }
  });
}

playGame();
