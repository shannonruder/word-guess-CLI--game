// // @author: Shannon Ruder
// @github: undacat
// @comment: word-guess-CLI-game using Node

// index.js will contain the logic of your app. Running it in Terminal/Bash will start the game.
// The app should end when a player guesses the correct word or runs out of guesses.



// Link in the Inquirer Package
var inquirer = require('inquirer');



// Link the list of random words
var guessWordList = require('./answers.js');

// Link in the word tester
var checkForLetter = require('./word.js');

// Link in the letters to display
var lettersToDisplay = require('./letter.js');



// ----------------------------- Global Variables -----------------------------
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];      
var displayGuessingGame;
var logoDisplay = () => {
console.log('__________________________________________________');
console.log('____________   _   _   _   _   _   _  ____________');       
console.log('____________  / \ / \ / \ / \ / \ / \ ____________');        
console.log('____________ ( C ( O ( D ( I ( N ( G ) ____________');       
console.log('____________  \_/ \_/ \_/ \_/ \_/ \_/  ____________');       
console.log('____________     _   _   _   _         ____________');       
console.log('____________    / \ / \ / \ / \        ____________');     
console.log('____________   ( W ( O ( R ( D )       ____________');       
console.log('____________    \_/ \_/ \_/ \_/         ____________');     
console.log('____________    _   _   _   _   _   _   _   _ ______'); 
console.log('____________   / \ / \ / \ / \ / \ / \ / \ / \ _____');
console.log('____________  ( G ( U ( E ( S ( S ( I ( N ( G )_____');
console.log('____________   \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/ _____');
console.log('____________     _   _   _   _    __________________');              
console.log('____________    / \ / \ / \ / \   __________________');             
console.log('____________   ( G ( A ( M ( E )  __________________');              
console.log('____________    \_/ \_/ \_/ \_/   __________________');              
console.log('__________________________________________________________');
console.log('|  Use your letter keys to try and guess the hidden word |');
console.log('__________________________________________________________\n');

};




// ----------------------------- Game Object -----------------------------

var game = {

  wordBank : guessWordList, // import a list of words
  guessesRemaining : 10, // per word
  currentWrd : null, // the word object


  startGame : function(){
    console.clear();
    logoDisplay();
    // make sure the user has 10 guesses
    this.guessesRemaining = 10;

    // get a random word from the array
    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[j];

    // Inform User game has begun
    console.log('\n','Test your coding chops by guessing the blanks of the word below.','\n', 'Is your programming vocab knowledge up to speed?','\n',);

    // Show the empty letters ( _ _ _ _ ) and guesses, etc.
    displayGuessingGame = new lettersToDisplay(this.currentWrd);
    displayGuessingGame.parseDisplay();
    console.log('Guesses Left: ' + game.guessesRemaining);

    // prompt for a letter
    keepPromptingUser();
  }

};



// ----------------------------- User Prompt Function (stand alone b/c of scoping issues inside the game object) -----------------------------

function keepPromptingUser(){

  // Always make a gap between inputs
  console.log('');

  // If enough guesses left, then prompt for new letter
  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

      // Collect Letter Input
      var inputLetter = userInput.letter.toLowerCase();
      
      // Valid input
      if(alphabet.indexOf(inputLetter) == -1){

        // Tell user they did not guess a letter
        console.log('Oops! "' + inputLetter + '" is not a letter. Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

        // Tell user they already guessed that letter
        console.log('You already guessed "' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else{

        // Remove the entry from the list of possible inputs
        lettersAlreadyGuessed.push(inputLetter);


        // Check for the letter in the word
        var letterInWord = checkForLetter(inputLetter, game.currentWrd);

        // If the letter is in the word, update the letter object
        if(letterInWord){

          // Add to correct letters list
          lettersCorrectlyGuessed.push(inputLetter);

          // Show the empty letters ( _ _ _ _ ) and guesses, etc.
          displayGuessingGame = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
          displayGuessingGame.parseDisplay();


          // Test if the user has won
          if(displayGuessingGame.winner){
            console.log('You win! Congrats, you are a legitimate programmer!');
            console.log('Woohooo! You rock. Go out and knock a few back to celebrate!')
            playAgain();
            return;
          }
          // Not a win yet, so ask for another input and decrement guesses
          else{
            console.log('Guesses Left: ' + game.guessesRemaining);
            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
            keepPromptingUser();
          }

        }
        // Otherwise, decrement guesses and re-prompt the old guessing game object
        else{
          game.guessesRemaining--;

          displayGuessingGame.parseDisplay();
          console.log('Guesses Left: ' + game.guessesRemaining);
          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          keepPromptingUser();
        }
        
      }

    });
    
  }
  // If not enough guesses left, then user losses
  else{
    console.log('Sorry. Better luck next time.');
    console.log('Better luck next time.');
    console.log('The word was "' + game.currentWrd + '".');
    playAgain();
  }

}

var playAgain = () => {
    inquirer.prompt([
      { type: 'list',
        name: 'playAgain',
        message: 'Would you like to play again?',
        choices: ['Yes', 'No']
      },
    ]).then(function (response) {
      let playAgain = response.playAgain;
      if (playAgain === 'No') {
        console.log('Ok, see you next time!');
        process.exit();
      }
      else {
        game.startGame();
      }
    });
  };
  


// Create a new game object using the constructor and begin playing
game.startGame();