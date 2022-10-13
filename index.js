import { createPromptModule } from 'inquirer';
const prompt = createPromptModule();

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
let currentSequence = [];
let currentSequenceString ='';
let timeLimit = 5000;
let penalty = 0;
let intervalID;

// build the sequence
const buildSequence = () => {
    const index = Math.floor(Math.random() * 4);
    currentSequence.push(commands[index]);
    currentSequenceString=currentSequenceString.concat(commands[index][0]);
}

// user prompt
const askForInput = () => {
    prompt(question).then((res) => {
        // correct
        if (res.bops.toUpperCase() == currentSequenceString) {
            clearInterval(intervalID);
            if (!penalty) { // if penalty is zero, start off at half a second
                penalty = 500
            } else {
                penalty = penalty * 1.5; // increase pnealty 150%
            }
            startGame();
        } else {
            endGame();
        };
    });
}

// timer countdown
const timerCountdown = (timer) => {
    intervalID = setInterval(()=> {
        timer-= 100;
        if (timer <= 0) {
            endGame();
        }
    }, 100)
}

// show the user the sequence
const showSequence = () => {
    // how many in the sequence
    const loops = currentSequence.length;
    for (let i = 0; i < loops; i++) {
        console.log(currentSequence[i]);
        setTimeout(()=> 1,800);
    }
}

// a game of Bop It
const startGame = async () => {
    // set the time limit for this round
    timeLimit = (5000 - penalty);
    // start the commands
    buildSequence();
    // show the sequence
    showSequence();
    // start the timer
    timerCountdown(timeLimit);
    // ask the question
    const question = await askForInput();
}

// end the game
const endGame = () =>{
    console.log(`You lost when your sequence was ${currentSequence.length} commands long`);
    process.exit();
}

// call the game upon launch
startGame();