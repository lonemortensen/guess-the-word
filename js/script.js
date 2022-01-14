/* GUESS THE WORD GAME */

//List of all of player's guessed letters:
const guessedLettersElements = document.querySelector(".guessed-letters");
//Guess! button:
const guessButton = document.querySelector(".guess");
//Field where player inputs letter:
const letterInput = document.querySelector(".letter");
//Field where word in progress will appear:
const wordInProgress = document.querySelector(".word-in-progress");
//Field where # of remaining guesses will appear:
const remainingGuessesField = document.querySelector(".remaining");
//The number counting down remaining guesses:
const numberGuesses = document.querySelector("span");
//Field where messages to player are communicated:
const playerMessage = document.querySelector(".message");
//Play Again! button:
const playAgainButton = document.querySelector(".play-again");

//Word the player must guess:
let word = "magnolia";
//Letters the player guesses:
let guessedLetters = [];
//Countdown of player's remaining guesses:
let remainingGuesses = 8;

//Get random word from text file:
const getWord = async function() {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text(); 
    const wordArray = words.split("\n"); 
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    addPlaceholders(word);
};

getWord();

//Add placeholder circles for each letter in word:
const addPlaceholders = function (word) {
    const placeholderCircles = [];
    for (const letter of word) {  
        placeholderCircles.push("●");
    }    
    wordInProgress.innerText = placeholderCircles.join(""); 
};

//Eventlistener for Guess! button to capture and validate player's input:
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); 
    clearPlayerMessage();
    const letter = letterInput.value; 
    const playerGuess = checkInput(letter); 
    if (playerGuess) {
        makeGuess(letter);
    } 
    clearInput();
}); 

//Clear letter input field when clicking the Guess! button:
const clearInput = function () {
    letterInput.value = "";
};

//Clear player message field when clicking the Guess! button:
const clearPlayerMessage = function () {
    playerMessage.innerText = "";
};

//Validate if player's input is a letter:
const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; 
    if (input.length === 0) {
        playerMessage.innerText = "Please enter your guess.";
    } else if (input.length > 1) {
        playerMessage.innerText = "You can only enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        playerMessage.innerText = "Please enter a letter from A to Z only.";
    } else {
        return input;
    }
};

//Check if player has already guessed the letter:
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) { 
        playerMessage.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(letter);
        countRemainingGuesses(letter);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};  

//Display guessed letters on the screen:
const showGuessedLetters = function () {
    guessedLettersElements.innerHTML = "";
    for (let item of guessedLetters) {
        let listItem = document.createElement("li");
        listItem.innerText = item;
        guessedLettersElements.append(listItem);
    }
}; 

//Update word in progress field and replace placeholder circles with correctly guessed letters:
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split(""); 
    const showCorrectLetters = []; 
    for (const item of wordArray) {
        if (guessedLetters.includes(item)) {
            showCorrectLetters.push(item.toUpperCase()); 
        } else {
            showCorrectLetters.push("●");
        } 
        wordInProgress.innerText = showCorrectLetters.join(""); 
        wordIsGuessed();
    }
};

//Count and display remaining guesses + let player know word when no more guesses left:
const countRemainingGuesses = function (letter) { 
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(letter)) {
        playerMessage.innerText = `Sorry! The word does not contain the letter ${letter}.`;  
        remainingGuesses -= 1; 
    } else {
        playerMessage.innerText = `Well done! The word includes the letter ${letter}.`;
    } 
    if (remainingGuesses === 0) {
        playerMessage.innerText = `Sorry! No more guesses left. The word is ${wordUpper}.`;
        startOver();
    }
    else if (remainingGuesses === 1) {
        numberGuesses.innerText = "1 guess";
    } else {
        numberGuesses.innerText = `${remainingGuesses} guesses`;
    }
};

//Check if player guessed the word and won:
const wordIsGuessed = function () {
    if (word.toUpperCase() === wordInProgress.innerText) { 
        playerMessage.classList.add("win");
        playerMessage.innerText = "You guessed the word! Congrats!";
        startOver();
    } 
};

//Hide and show elements to start the game over:
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesField.classList.add("hide");
    guessedLettersElements.classList.add("hide");
    playAgainButton.classList.remove("hide"); 
};

//Eventlistener for Play Again! button to reset values + display new word: 
playAgainButton.addEventListener("click", function() {
    playerMessage.classList.remove("win");
    playerMessage.innerText = "";
    guessedLettersElements.innerHTML = ""; 
    remainingGuesses = 8;
    guessedLetters = [];
    numberGuesses.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesField.classList.remove("hide");
    guessedLettersElements.classList.remove("hide");
    playAgainButton.classList.add("hide"); 
    getWord();
});

/* END */ 