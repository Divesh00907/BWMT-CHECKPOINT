document.addEventListener('DOMContentLoaded', function () {
    // Counter elements
    const countSpan = document.getElementById('count');
    const incrementBtn = document.getElementById('incrementBtn');

    // RPS elements
    const rockBtn = document.getElementById('rockBtn');
    const paperBtn = document.getElementById('paperBtn');
    const scissorsBtn = document.getElementById('scissorsBtn');
    const result = document.getElementById('result');
    const choicesDiv = document.querySelector('.choices');

    // Score elements
    const playerScoreSpan = document.getElementById('playerScore');
    const computerScoreSpan = document.getElementById('computerScore');

    // State
    let count = 0;
    let playerScore = 0;
    let computerScore = 0;

    // Counter button
    if (incrementBtn && countSpan) {
        incrementBtn.addEventListener('click', function () {
            count++;
            countSpan.textContent = count;
            console.log('Count is now:', count);
        });
    }

    // Main game function
    function play(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        let outcome = '';

        if (playerChoice === computerChoice) {
            outcome = "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            outcome = 'You win!';
            playerScore++;
            if (playerScoreSpan) {
                playerScoreSpan.textContent = playerScore;
            }
        } else {
            outcome = 'Computer wins!';
            computerScore++;
            if (computerScoreSpan) {
                computerScoreSpan.textContent = computerScore;
            }
        }

        // Show result
        if (result) {
            result.textContent = `You: ${playerChoice} | Computer: ${computerChoice} | ${outcome}`;
        }

        // Visual feedback
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));

        const selectedBtn = document.getElementById(playerChoice + 'Btn');
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
    }

    // Individual button listeners
    if (rockBtn) {
        rockBtn.addEventListener('click', function (event) {
            play('rock');
            console.log('Event target:', event.target);
            console.log('Event type:', event.type);
        });
    }

    if (paperBtn) {
        paperBtn.addEventListener('click', function (event) {
            play('paper');
            console.log('Event target:', event.target);
            console.log('Event type:', event.type);
        });
    }

    if (scissorsBtn) {
        scissorsBtn.addEventListener('click', function (event) {
            play('scissors');
            console.log('Event target:', event.target);
            console.log('Event type:', event.type);
        });
    }

    // Optional event delegation for all choice buttons
    if (choicesDiv) {
        choicesDiv.addEventListener('click', function (event) {
            if (event.target.classList.contains('choice-btn')) {
                const choice = event.target.id.replace('Btn', '').toLowerCase();
                console.log('Delegated event target:', event.target);
                console.log('Delegated event type:', event.type);
            }
        });
    }
});

// Flatland interactivity
const square = document.getElementById('square');
const words = document.getElementById('words');

function changeColor(color) {
    // Remove any existing color classes
    square.classList.remove('green', 'red', 'blue');
    // Add the new color class
    square.classList.add(color);
}

square.addEventListener('mouseover', function() {
    changeColor('green');
    words.textContent = 'The square is now green!';
});

square.addEventListener('mouseout', function() {
    square.classList.remove('green', 'red', 'blue');
    words.textContent = 'Hover over the square!';
});

square.addEventListener('click', function() {
    changeColor('red');
    words.textContent = 'You clicked the square!';
});

// Buzzword generator
const generateBtn = document.getElementById('generateBtn');
const buzzwordEl = document.getElementById('buzzword');

const adjectives = ['Agile', 'Cloud-Native', 'AI-Powered', 'Blockchain', 'Synergistic'];
const nouns = ['Solution', 'Platform', 'Ecosystem', 'Framework', 'Paradigm'];
const verbs = ['Disrupting', 'Transforming', 'Revolutionizing', 'Optimizing', 'Scaling'];

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateBuzzword() {
    const buzzword = `${randomElement(verbs)} the ${randomElement(adjectives)} ${randomElement(nouns)}`;
    buzzwordEl.textContent = buzzword;
    buzzwordEl.style.fontWeight = 'bold';
}

generateBtn.addEventListener('click', generateBuzzword);

// History tracking
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

function addToHistory(text) {
    // Create a new list item
    const li = document.createElement('li');
    li.textContent = text;

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.style.marginLeft = '1rem';
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(deleteBtn);
    historyList.appendChild(li);
}

// Update generateBuzzword to save history
function generateBuzzword() {
    const buzzword = `${randomElement(verbs)} the ${randomElement(adjectives)} ${randomElement(nouns)}`;
    buzzwordEl.textContent = buzzword;
    addToHistory(buzzword);
}

// Clear all history
clearHistoryBtn.addEventListener('click', function() {
    historyList.innerHTML = '';
});

// Working with data attributes
const card = document.querySelector('.card');
const showDataBtn = card.querySelector('.show-data');

showDataBtn.addEventListener('click', function() {
    const category = card.dataset.category;
    const id = card.dataset.id;
    alert(`Category: ${category}, ID: ${id}`);
});
const toggleBtn = document.getElementById('toggleBtn');
const toggleContent = document.getElementById('toggleContent');

toggleBtn.addEventListener('click', function() {
    toggleContent.classList.toggle('hidden');

    // Update button text
    if (toggleContent.classList.contains('hidden')) {
        toggleBtn.textContent = 'Show Content';
    } else {
        toggleBtn.textContent = 'Hide Content';
    }
});