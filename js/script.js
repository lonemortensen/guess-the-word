// GUESS THE WORD GAME

//List of all of player's guessed letters:
const guessedLetters = document.querySelector(".guessed-letters");
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

//Eventlistener for Guess button:
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); // prevents reloading of page after submitting the form.
    const letter = letterInput.value; 
    console.log(letter);
    clearInput();
}); 

//Function to clear letter input field when clicking the Guess button:
const clearInput = function () {
    letterInput.value = "";
};