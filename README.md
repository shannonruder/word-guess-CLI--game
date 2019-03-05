# Advanced JavaScript Assignment: Constructor Word Guess

### Overview


This assignment is a Word Guess command-line game using constructor functions.


* Please submit the link to the Github Repository!

## Instructions

1. To run this application, from the terminal/bash window, first run npm install.
    • node package modules used in this application are  `inquirer` or `prompt`.

2. Second, to start the game, type the command:  'node index.js'.

3. The game uses advanced javascript. The **index.js** contains logic for a word guessing game. It randomly selects a word and uses the `Word` constructor to store it.  It prompts the user for each guess and keeps track of the user's remaining guesses. Finally, it calls out to a:


**letter.js** file with a constructor called 'Letter'.  `Letter.js` *does not* `require` any other files. This contructor either displays an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. The 'Letter' constructor defines:

  * A string value to store the underlying character for the letter

  * A boolean value that stores whether that letter has been guessed yet

  * A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

  * A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
  
  The index.js contains logic for a word guessing game that calls out to a:


**word.js** file with a constructor called 'Word'. `The 'Word' constructor depends on the 'Letter' constructor. This is used to create an object representing the current word the user is attempting to guess. That means the 'Letter' constructor defines:

  * An array of `new` Letter objects representing the letters of the underlying word

  * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

  * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)


