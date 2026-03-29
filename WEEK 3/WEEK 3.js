document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded and ready!');

    
    const countSpan = document.getElementById('count');
    const incrementBtn = document.getElementById('incrementBtn');

    let count = 0;

    incrementBtn.addEventListener('click', function () {
        count++;
        countSpan.textContent = count;
        console.log('Count is now:', count);
    });

    
    const choicesDiv = document.querySelector('.choices');
    const result = document.getElementById('result');
    const playerScoreSpan = document.getElementById('playerScore');
    const computerScoreSpan = document.getElementById('computerScore');

    let playerScore = 0;
    let computerScore = 0;

    function play(playerChoice) {
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));

        const selectedBtn = document.getElementById(playerChoice + 'Btn');
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }

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

        result.textContent = `You: ${playerChoice} | Computer: ${computerChoice} | ${outcome}`;
    }

    choicesDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('choice-btn')) {
            const choice = event.target.textContent.toLowerCase();
            play(choice);

            console.log('Event target:', event.target);
            console.log('Event type:', event.type);
        }
    });

   
    const square = document.getElementById('square');
    const words = document.getElementById('words');

    function changeColor(color) {
        square.classList.remove('green', 'red', 'blue');
        square.classList.add(color);
    }

    square.addEventListener('mouseover', function () {
        changeColor('green');
        words.textContent = 'The square is now green!';
    });

    square.addEventListener('mouseout', function () {
        square.classList.remove('green', 'red', 'blue');
        words.textContent = 'Hover over the square!';
    });

    square.addEventListener('click', function () {
        changeColor('red');
        words.textContent = 'You clicked the square!';
    });
=
    const generateBtn = document.getElementById('generateBtn');
    const buzzwordEl = document.getElementById('buzzword');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');

    const adjectives = ['Agile', 'Cloud-Native', 'AI-Powered', 'Blockchain', 'Synergistic'];
    const nouns = ['Solution', 'Platform', 'Ecosystem', 'Framework', 'Paradigm'];
    const verbs = ['Disrupting', 'Transforming', 'Revolutionizing', 'Optimizing', 'Scaling'];

    function randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function addToHistory(text) {
        const li = document.createElement('li');
        li.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';

        deleteBtn.addEventListener('click', function () {
            li.remove();
        });

        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    }

    function generateBuzzword() {
        const buzzword = `${randomElement(verbs)} the ${randomElement(adjectives)} ${randomElement(nouns)}`;
        buzzwordEl.textContent = buzzword;
        buzzwordEl.style.fontWeight = 'bold';
        addToHistory(buzzword);
    }

    generateBtn.addEventListener('click', generateBuzzword);

    clearHistoryBtn.addEventListener('click', function () {
        historyList.innerHTML = '';
    });

    const card = document.querySelector('.card');
    const showDataBtn = card.querySelector('.show-data');

    showDataBtn.addEventListener('click', function () {
        const category = card.dataset.category;
        const id = card.dataset.id;
        alert(`Category: ${category}, ID: ${id}`);
    });

   
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleContent = document.getElementById('toggleContent');

    toggleBtn.addEventListener('click', function () {
        toggleContent.classList.toggle('hidden');

        if (toggleContent.classList.contains('hidden')) {
            toggleBtn.textContent = 'Show Content';
        } else {
            toggleBtn.textContent = 'Hide Content';
        }
    });
});
