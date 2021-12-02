// GUESS THE WORD GAME

//List of all of player's guessed letters:
const guessedLettersElements = document.querySelector(".guessed-letters");
//Guess! button:
const guessButton = document.querySelector(".guess");
//Field where player inputs letter:
const letterInput = document.querySelector(".letter");
//Field where word in progress will appear:
const wordInProgress = document.querySelector(".word-in-progress");
//Field where # of remaining guesses will appear:
const remainingGuesses = document.querySelector(".remaining");
//The number counting down remaining guesses:
const numberGuesses = document.querySelector("span");
//Field where messages to player are communicated:
const playerMessage = document.querySelector(".message");
//Play Again! button:
const playAgainButton = document.querySelector(".play-again");
//Word the player must guess:
const word = "magnolia";
//Letters the player guesses:
const guessedLetters = [];

//Add placeholder circles for each letter in word:
const addPlaceholders = function (word) {
    const placeholderCircles = [];
    for (const letter of word) {  // for...of loop can iterate over the elements of a String one-by-one, and allows you to use those elements.
        console.log(letter);
        placeholderCircles.push("●");
    }    
    wordInProgress.innerText = placeholderCircles.join(""); 
};

addPlaceholders(word);

//Eventlistener for Guess! button and validation of player's input:
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); // prevents reloading of page after submitting form.
    clearPlayerMessage();
    const letter = letterInput.value; 
    //console.log(letter);
    const playerGuess = checkInput(letter); // saves result of checkInput function call to variable.
    if (playerGuess) {
        makeGuess(letter);
    } 
    //console.log(playerGuess);
    clearInput();
}); 

//Clear letter input field when clicking the Guess! button:
const clearInput = function () {
    letterInput.value = "";
};

//Validate if player's input is a letter:
const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; // regular expression ensures player's input is a letter.
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

//Clear player message field when clicking the Guess! button:
const clearPlayerMessage = function () {
    playerMessage.innerText = "";
};

//Check if player has already guessed the letter:
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) { 
        playerMessage.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters);
};  

