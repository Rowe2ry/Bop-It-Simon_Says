# The Challenge

Make a CLI "Bop It" app

## Instructions

* Add instructions for user (Bop It, Twist It, Pull It, Flick It) in the command line
* Set a time limit for user response

* Receive input from the user and determine if they were correct

* end the game if the user is incorrect

* respond to correct answers with a new prompt and a shortened time limit

## How to play

Install the dependancies (Inquirer) by running
```
npm i install
```
Launch the application via node using the following command
```
node index.js
```

You will see a prompt to either "Bop It! (B)", "Pull It! (P)", "Twist It! (T)", or "Flick It! (F)"

Respond by typing either "B", "P", "T", or "F" followed by a return (enter) to submit your answer. I misunderstood the Bop It play structure, so continued gameplay actually follows a "Simon Says" electronic toy structure. It will proceed to show you a longer and longer sequence to which you must type and submit in a shorter and shorter window of time. At the end of the game, it will give you a score of how long you were able to make your sequence. Eg. "BPTFPTBBPPTF" score of 12 (length of the string before the time ran out)




