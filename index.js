import { createPromptModule } from 'inquirer';
const prompt = createPromptModule();

/* =====================================================
 * Global Variable Declarations
 * ===================================================== */

// THE one question
const question = {
    type: 'input',
    name: 'bops',
    message: 'Put in the current sequence!'
};

// Possible Commands
const commands = [
    'Bop it! (B)',
    'Twist It! (T)',
    'Pull it! (P)',
    'Flick it! (F)'
]

// starting values
const currentSequence = [];
let currentSequenceString ='';
let timeLimit = 5500;
let penalty = 500;
let intervalID;

/* =====================================================
 * Function Definitions
 * ===================================================== */

// calculate the time limit for the new round
const calculateTimeLimit = () => {
    if (penalty <= 4250) {
        timeLimit = (5500 - penalty);
    } else {
        timeLimit = 750 // min time is 750ms
    }
}

// build the sequence
const buildSequence = () => {
    const index = Math.floor(Math.random() * 4);
    currentSequence.push(commands[index]); // add commands to the array
    // build a secuence string with the first character of each command in the array. the user's inuts will be tested against this string
    currentSequenceString = currentSequenceString.concat(commands[index][0]);
}

// show the user the sequence
const showSequence = () => {
    // how many in the sequence
    const loops = currentSequence.length;
    for (let i = 0; i < loops; i++) {
        console.log(currentSequence[i]);
    }
}

// user prompt
const askForInput = () => {
    prompt(question).then((res) => { // if correct
        if (res.bops.toUpperCase() == currentSequenceString) {
            clearInterval(intervalID); // stop the timer
            penalty = penalty * 1.25; // increase pnealty 125%
            startGame(); // recursive, start a new game w/ the new penalty and continue building the sequence
        } else {  // wrong, game over
            endGame();
        };
    });
}

// timer countdown
const timerCountdown = (timer) => {
    intervalID = setInterval(()=> {
        timer-= 100;
        if (timer <= 0) {
            endGame(); // time is up
        }
    }, 100);
}

// end the game
const endGame = () =>{
    console.log(`You lost when your sequence was ${currentSequence.length} commands long`);
    process.exit();
}

// a game of Bop It
const startGame = () => {
    // set the time limit for this round
    calculateTimeLimit();
    // add a new command
    buildSequence();
    // show the sequence
    showSequence();
    // start the timer
    timerCountdown(timeLimit);
    // ask the question
    askForInput();
}

/* =====================================================
 * Function Calls
 * ===================================================== */

// call the game upon launch
startGame();