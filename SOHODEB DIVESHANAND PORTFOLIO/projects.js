document.addEventListener('DOMContentLoaded', function () {

    // ROCK PAPER SCISSORS
   const buttons = document.querySelectorAll('.choice-btn');
const result = document.getElementById('result');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
const resetBtn = document.getElementById('resetBtn');

let playerScore = 0;
let computerScore = 0;

// emoji map
const emojiMap = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

buttons.forEach(function (button) {
    button.addEventListener('click', function () {

        // extract word (remove emoji)
        const playerChoice = button.textContent.toLowerCase().includes('rock') ? 'rock' :
                             button.textContent.toLowerCase().includes('paper') ? 'paper' :
                             'scissors';

        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        let outcome;

        if (playerChoice === computerChoice) {
            outcome = "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            outcome = 'You win!';
            playerScore++;
            playerScoreSpan.textContent = playerScore;
        } else {
            outcome = 'Computer wins!';
            computerScore++;
            computerScoreSpan.textContent = computerScore;
        }

        result.textContent =
            `${emojiMap[playerChoice]} vs ${emojiMap[computerChoice]} → ${outcome}`;
    });
});

// RESET BUTTON
resetBtn.addEventListener('click', function () {
    playerScore = 0;
    computerScore = 0;

    playerScoreSpan.textContent = 0;
    computerScoreSpan.textContent = 0;

    result.textContent = "Game reset!";
});
    // FLATLAND
    const square = document.getElementById('square');
    const words = document.getElementById('words');

    square.addEventListener('mouseover', function () {
        square.classList.remove('red');
        square.classList.add('green');
        words.textContent = 'The square is now green!';
    });

    square.addEventListener('mouseout', function () {
        square.classList.remove('green', 'red');
        words.textContent = 'Hover over the square!';
    });

    square.addEventListener('click', function () {
        square.classList.remove('green');
        square.classList.add('red');
        words.textContent = 'You clicked the square!';
    });

});