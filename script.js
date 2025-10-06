// Physics questions focused on Three Simple Circuits and Magnetic Flux
let questions = [
    {
        type: 'click',
        question: "How many types of basic electrical circuits are there?",
        answer: 3
    },
    {
        type: 'multiple',
        question: "Which of the following is a type of simple circuit?",
        options: ["Series Circuit", "Parallel Circuit", "Compound Circuit", "Series-Parallel Circuit"],
        answer: "Series Circuit",
        multiSelect: false
    },
    {
        type: 'slider',
        question: "Set the resistance value to 50Ω for a circuit with 10V and 0.2A current",
        answer: 50,
        min: 0,
        max: 100
    },
    {
        type: 'components',
        question: "Select the components needed for a basic series circuit",
        components: [
            { id: 1, name: "Battery", required: true },
            { id: 2, name: "Resistor", required: true },
            { id: 3, name: "Switch", required: false },
            { id: 4, name: "Capacitor", required: false },
            { id: 5, name: "Ammeter", required: false },
            { id: 6, name: "Voltmeter", required: false }
        ],
        answer: [1, 2] // IDs of required components
    },
    {
        type: 'memory',
        question: "Remember these electrical units and select the ones related to circuits",
        cards: [
            { id: 1, value: 'V', correct: true },
            { id: 2, value: 'A', correct: true },
            { id: 3, value: 'Ω', correct: true },
            { id: 4, value: 'W', correct: true },
            { id: 5, value: 'T', correct: false },
            { id: 6, value: 'Hz', correct: false },
            { id: 7, value: 'J', correct: false },
            { id: 8, value: 'N', correct: false }
        ],
        timeToView: 5 // seconds to view the cards before they flip back
    },
    {
        type: 'pacman',
        question: "Move to the correct formula for Ohm's Law",
        gridSize: 8,
        playerPosition: { x: 0, y: 0 },
        answers: [
            { x: 5, y: 3, value: "V = IR", correct: true },
            { x: 2, y: 6, value: "P = IV", correct: false },
            { x: 7, y: 2, value: "C = Q / V", correct: false }
        ],
        obstacles: [
            { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
            { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
            { x: 5, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 3 },
            { x: 4, y: 5 }, { x: 5, y: 6 }, { x: 6, y: 7 }
        ]
    },
    {
        type: 'dragdrop',
        question: "Drag the correct units to their corresponding electrical quantities",
        pairs: [
            { item: "Voltage", target: "Volt (V)" },
            { item: "Current", target: "Ampere (A)" },
            { item: "Resistance", target: "Ohm (Ω)" },
            { item: "Power", target: "Watt (W)" }
        ]
    },
    {
        type: 'wordle',
        question: "Guess the 5-letter word related to electrical circuits",
        answer: "VOLTS"
    },
    {
        type: 'hangman',
        question: "Guess the word related to magnetic fields",
        answer: "FLUX"
    },
    {
        type: 'click',
        question: "How many paths does current flow have in a series circuit?",
        answer: 1
    },
    {
        type: 'multiple',
        question: "What does magnetic flux measure?",
        options: ["Strength of magnetic field", "Number of magnetic field lines", "Direction of magnetic field", "Area of magnetic field"],
        answer: "Number of magnetic field lines",
        multiSelect: false
    },
    {
        type: 'slider',
        question: "Set the magnetic flux value to 0.5 Weber for a 0.2T field and 2.5m² area",
        answer: 0.5,
        min: 0,
        max: 1,
        step: 0.01
    },
    {
        type: 'components',
        question: "Select the components needed to demonstrate electromagnetic induction",
        components: [
            { id: 1, name: "Magnet", required: true },
            { id: 2, name: "Coil", required: true },
            { id: 3, name: "Galvanometer", required: true },
            { id: 4, name: "Resistor", required: false },
            { id: 5, name: "Battery", required: false },
            { id: 6, name: "Switch", required: false }
        ],
        answer: [1, 2, 3] // IDs of required components
    },
    {
        type: 'memory',
        question: "Remember these magnetic units and select the ones related to magnetism",
        cards: [
            { id: 1, value: 'T', correct: true },
            { id: 2, value: 'Wb', correct: true },
            { id: 3, value: 'H', correct: true },
            { id: 4, value: 'A/m', correct: true },
            { id: 5, value: 'V', correct: false },
            { id: 6, value: 'Ω', correct: false },
            { id: 7, value: 'F', correct: false },
            { id: 8, value: 'J', correct: false }
        ],
        timeToView: 5
    }
];

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let clickCount = 0;
let gameCompleted = false;
let selectedOptions = [];
let selectedComponents = [];
let sliderValue = 50;
let memoryCards = [];
let memoryGameTimeLeft = 10;
let memoryGameTimer;
let playerPosition = { x: 0, y: 0 };
let answers = [];
let obstacles = [];
let dragItems = [];
let dropTargets = [];
let answered = false;
let memoryGameStarted = false;
let memoryCardsFlipped = [];
let dragDropState = {};

// Wordle variables
let wordleGuesses = [];
let wordleCurrentGuess = '';
let wordleAttempts = 0;
const WORDLE_MAX_ATTEMPTS = 4;

// Hangman variables
let hangmanWord = '';
let hangmanGuessedLetters = [];
let hangmanIncorrectGuesses = 0;
const HANGMAN_MAX_INCORRECT = 6;

// DOM elements
const questionElement = document.getElementById('question');
const questionTypeElement = document.getElementById('question-type');
const clickCountElement = document.getElementById('click-count');
const decrementBoxElement = document.getElementById('decrement-box');
const incrementBoxElement = document.getElementById('increment-box');
const decrementEffectElement = document.getElementById('decrement-effect');
const incrementEffectElement = document.getElementById('increment-effect');
const clickAreaElement = document.getElementById('click-area');
const optionsContainerElement = document.getElementById('options-container');
const sliderContainerElement = document.getElementById('slider-container');
const sliderElement = document.getElementById('answer-slider');
const sliderValueElement = document.getElementById('slider-value');
const componentsContainerElement = document.getElementById('components-container');
const memoryGameContainerElement = document.getElementById('memory-game-container');
const memoryCardsElement = document.getElementById('memory-cards');
const timeRemainingElement = document.getElementById('time-remaining');
const startMemoryButton = document.getElementById('start-memory-btn');
const pacmanGameContainerElement = document.getElementById('pacman-game-container');
const gameGridElement = document.getElementById('game-grid');
const pacmanAnswersElement = document.getElementById('pacman-answers');
const dragDropContainerElement = document.getElementById('drag-drop-container');
const dragItemsElement = document.getElementById('drag-items');
const dropTargetsElement = document.getElementById('drop-targets');
const wordleContainerElement = document.getElementById('wordle-container');
const wordleGuessesElement = document.getElementById('wordle-guesses');
const wordleInputElement = document.getElementById('wordle-input');
const hangmanContainerElement = document.getElementById('hangman-container');
const hangmanWordElement = document.getElementById('hangman-word');
const hangmanKeyboardElement = document.getElementById('hangman-keyboard');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');
const resetButton = document.getElementById('reset-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');
const progressPercentElement = document.getElementById('progress-percent');
const questionNumberElement = document.getElementById('question-number');
const totalQuestionsElement = document.getElementById('total-questions');

// Splash screen elements
const splashScreen = document.getElementById('splash-screen');
const splashProgress = document.getElementById('splash-progress');
const mainContainer = document.querySelector('.container');

// Initialize the game
function initGame() {
    questions = shuffleArray([...questions]);

    totalQuestionsElement.textContent = questions.length;
    
    // Set up slider event listener
    sliderElement.addEventListener('input', function() {
        sliderValue = this.value;
        sliderValueElement.textContent = sliderValue;
    });
    
    // Set up click boxes
    decrementBoxElement.addEventListener('click', decreaseClickCount);
    incrementBoxElement.addEventListener('click', increaseClickCount);
    
    // Set up keyboard controls for pacman game
    document.addEventListener('keydown', handleKeyDown);
    
    // Set up start memory button
    startMemoryButton.addEventListener('click', startMemoryGameTimer);
    
    // Set up wordle input
    wordleInputElement.addEventListener('input', function() {
        this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
        
        // Auto-submit when 5 letters are entered
        if (this.value.length === 5) {
            submitWordleGuess();
        }
    });
    
    showQuestion();
    updateProgress();
    
    // Event listeners
    submitButton.addEventListener('click', validateAnswer);
    nextButton.addEventListener('click', nextQuestion);
    resetButton.addEventListener('click', resetGame);
}

// Decrease click count
function decreaseClickCount() {
    if (gameCompleted || answered) return;
    
    if (clickCount > 0) {
        clickCount--;
        clickCountElement.textContent = clickCount;
        
        // Create click effect animation
        const effect = decrementEffectElement.cloneNode(true);
        decrementBoxElement.appendChild(effect);
        
        // Animate the effect
        effect.style.animation = 'growAndFade 0.5s forwards';
        setTimeout(() => {
            effect.remove();
        }, 500);
    }
}

// Increase click count
function increaseClickCount() {
    if (gameCompleted || answered) return;
    
    clickCount++;
    clickCountElement.textContent = clickCount;
    
    // Create click effect animation
    const effect = incrementEffectElement.cloneNode(true);
    incrementBoxElement.appendChild(effect);
    
    // Animate the effect
    effect.style.animation = 'growAndFade 0.5s forwards';
    setTimeout(() => {
        effect.remove();
    }, 500);
}

// Display current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionNumberElement.textContent = currentQuestionIndex + 1;
    
    // Hide all question type UIs first
    clickAreaElement.style.display = 'none';
    optionsContainerElement.style.display = 'none';
    sliderContainerElement.style.display = 'none';
    componentsContainerElement.style.display = 'none';
    memoryGameContainerElement.style.display = 'none';
    pacmanGameContainerElement.style.display = 'none';
    dragDropContainerElement.style.display = 'none';
    wordleContainerElement.style.display = 'none';
    hangmanContainerElement.style.display = 'none';
    
    // Reset answered state
    answered = false;
    memoryGameStarted = false;
    memoryCardsFlipped = [];
    dragDropState = {};
    
    // Reset Wordle
    wordleGuesses = [];
    wordleCurrentGuess = '';
    wordleAttempts = 0;
    wordleGuessesElement.innerHTML = '';
    wordleInputElement.value = '';
    wordleInputElement.disabled = false;
    
    // Reset Hangman
    hangmanGuessedLetters = [];
    hangmanIncorrectGuesses = 0;
    hangmanWordElement.innerHTML = '';
    hangmanKeyboardElement.innerHTML = '';
    document.querySelectorAll('.hangman-part').forEach(part => {
        part.style.display = 'none';
    });
    
    // Show the appropriate UI based on question type
    if (currentQuestion.type === 'click') {
        questionTypeElement.textContent = 'Click';
        clickAreaElement.style.display = 'block';
        clickCount = 0;
        clickCountElement.textContent = clickCount;
        
        // Enable click boxes
        decrementBoxElement.style.cursor = 'pointer';
        incrementBoxElement.style.cursor = 'pointer';
        decrementBoxElement.style.opacity = '1';
        incrementBoxElement.style.opacity = '1';
    } else if (currentQuestion.type === 'multiple') {
        questionTypeElement.textContent = 'Multiple Choice';
        optionsContainerElement.style.display = 'grid';
        renderOptions(currentQuestion.options, currentQuestion.multiSelect || false);
    } else if (currentQuestion.type === 'slider') {
        questionTypeElement.textContent = 'Slider';
        sliderContainerElement.style.display = 'block';
        // Set slider min, max, step and default value
        sliderElement.min = currentQuestion.min;
        sliderElement.max = currentQuestion.max;
        sliderElement.step = currentQuestion.step || 1;
        sliderElement.value = Math.floor((currentQuestion.max - currentQuestion.min) / 2);
        sliderValue = sliderElement.value;
        sliderValueElement.textContent = sliderValue;
        sliderElement.disabled = false;
    } else if (currentQuestion.type === 'components') {
        questionTypeElement.textContent = 'Component Selection';
        componentsContainerElement.style.display = 'grid';
        renderComponents(currentQuestion.components);
    } else if (currentQuestion.type === 'memory') {
        questionTypeElement.textContent = 'Memory Game';
        memoryGameContainerElement.style.display = 'flex';
        timeRemainingElement.textContent = currentQuestion.timeToView;
        startMemoryButton.style.display = 'block';
        prepareMemoryGame(currentQuestion.cards);
    } else if (currentQuestion.type === 'pacman') {
        questionTypeElement.textContent = 'Movement Game';
        pacmanGameContainerElement.style.display = 'block';
        startPacmanGame(currentQuestion.gridSize, currentQuestion.playerPosition, currentQuestion.answers, currentQuestion.obstacles);
    } else if (currentQuestion.type === 'dragdrop') {
        questionTypeElement.textContent = 'Drag and Drop';
        dragDropContainerElement.style.display = 'block';
        startDragDropGame(currentQuestion.pairs);
    } else if (currentQuestion.type === 'wordle') {
        questionTypeElement.textContent = 'Wordle';
        wordleContainerElement.style.display = 'block';
        initWordleGame(currentQuestion.answer);
    } else if (currentQuestion.type === 'hangman') {
        questionTypeElement.textContent = 'Hangman';
        hangmanContainerElement.style.display = 'block';
        initHangmanGame(currentQuestion.answer);
    }
    
    // Reset UI state
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
    selectedOptions = [];
    selectedComponents = [];
}

// Initialize Wordle game
function initWordleGame(answer) {
    // Create empty guess rows
    for (let i = 0; i < WORDLE_MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-cell';
            row.appendChild(cell);
        }
        
        wordleGuessesElement.appendChild(row);
    }
}

// Submit Wordle guess
function submitWordleGuess() {
    if (answered) return;
    
    const guess = wordleInputElement.value.toUpperCase();
    
    if (guess.length !== 5) {
        feedbackElement.textContent = "Please enter a 5-letter word!";
        feedbackElement.className = "feedback incorrect";
        return;
    }
    
    wordleInputElement.value = '';
    wordleAttempts++;
    
    // Add to guesses
    wordleGuesses.push(guess);
    
    // Update display
    updateWordleDisplay();
    
    // Check if game is over
    if (guess === questions[currentQuestionIndex].answer) {
        answered = true;
        feedbackElement.innerHTML = "<i class='fas fa-check-circle'></i> Correct! Well done!";
        feedbackElement.className = "feedback correct";
        submitButton.style.display = 'none';
        nextButton.style.display = 'block';
        score++;
        scoreElement.textContent = score;
        wordleInputElement.disabled = true;
        createCelebration();
    } else if (wordleAttempts >= WORDLE_MAX_ATTEMPTS) {
        answered = true;
        feedbackElement.innerHTML = `<i class='fas fa-times-circle'></i> Game over! The word was ${questions[currentQuestionIndex].answer}.`;
        feedbackElement.className = "feedback incorrect";
        submitButton.style.display = 'none';
        nextButton.style.display = 'block';
        wordleInputElement.disabled = true;
    }
}

// Update Wordle display
function updateWordleDisplay() {
    const answer = questions[currentQuestionIndex].answer;
    const rows = wordleGuessesElement.querySelectorAll('.wordle-row');
    
    for (let i = 0; i < wordleGuesses.length; i++) {
        const guess = wordleGuesses[i];
        const cells = rows[i].querySelectorAll('.wordle-cell');
        
        for (let j = 0; j < 5; j++) {
            cells[j].textContent = guess[j];
            
            if (guess[j] === answer[j]) {
                cells[j].classList.add('correct');
            } else if (answer.includes(guess[j])) {
                cells[j].classList.add('present');
            } else {
                cells[j].classList.add('absent');
            }
        }
    }
}

// Initialize Hangman game
function initHangmanGame(answer) {
    hangmanWord = answer.toUpperCase();
    
    // Create word display
    for (let i = 0; i < hangmanWord.length; i++) {
        const letterElement = document.createElement('div');
        letterElement.className = 'hangman-letter';
        letterElement.dataset.letter = hangmanWord[i];
        hangmanWordElement.appendChild(letterElement);
    }
    
    // Create keyboard
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < letters.length; i++) {
        const keyElement = document.createElement('div');
        keyElement.className = 'hangman-key';
        keyElement.textContent = letters[i];
        keyElement.addEventListener('click', () => handleHangmanGuess(letters[i]));
        hangmanKeyboardElement.appendChild(keyElement);
    }
    
    // Show the gallows
    document.querySelectorAll('.hangman-part').forEach(part => {
        if (['hangman-base', 'hangman-pole', 'hangman-top', 'hangman-rope'].includes(part.classList[1])) {
            part.style.display = 'block';
        }
    });
}

// Handle Hangman guess
function handleHangmanGuess(letter) {
    if (answered) return;
    
    const keyElement = Array.from(hangmanKeyboardElement.children).find(el => el.textContent === letter);
    keyElement.classList.add('used');
    
    hangmanGuessedLetters.push(letter);
    
    if (hangmanWord.includes(letter)) {
        // Correct guess
        document.querySelectorAll(`.hangman-letter[data-letter="${letter}"]`).forEach(el => {
            el.textContent = letter;
        });
        
        // Check if word is complete
        const wordComplete = Array.from(hangmanWordElement.children).every(el => el.textContent !== '');
        
        if (wordComplete) {
            answered = true;
            feedbackElement.innerHTML = "<i class='fas fa-check-circle'></i> Correct! Well done!";
            feedbackElement.className = "feedback correct";
            submitButton.style.display = 'none';
            nextButton.style.display = 'block';
            score++;
            scoreElement.textContent = score;
            createCelebration();
        }
    } else {
        // Incorrect guess
        hangmanIncorrectGuesses++;
        
        // Show the appropriate hangman part
        const parts = [
            'hangman-head', 
            'hangman-body', 
            'hangman-left-arm', 
            'hangman-right-arm', 
            'hangman-left-leg', 
            'hangman-right-leg'
        ];
        
        if (hangmanIncorrectGuesses <= parts.length) {
            document.querySelector(`.${parts[hangmanIncorrectGuesses-1]}`).style.display = 'block';
        }
        
        if (hangmanIncorrectGuesses >= HANGMAN_MAX_INCORRECT) {
            answered = true;
            feedbackElement.innerHTML = `<i class='fas fa-times-circle'></i> Game over! The word was ${hangmanWord}.`;
            feedbackElement.className = "feedback incorrect";
            submitButton.style.display = 'none';
            nextButton.style.display = 'block';
            
            // Reveal the word
            Array.from(hangmanWordElement.children).forEach((el, i) => {
                el.textContent = hangmanWord[i];
            });
        }
    }
}

// Prepare memory game (without starting timer)
function prepareMemoryGame(cards) {
    memoryCards = [...cards];
    memoryCardsElement.innerHTML = '';
    
    // Render cards face down
    memoryCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.innerHTML = `
            <div class="front">?</div>
            <div class="back">${card.value}</div>
        `;
        memoryCardsElement.appendChild(cardElement);
    });
}

// Start memory game timer when button is clicked
function startMemoryGameTimer() {
    if (memoryGameStarted) return;
    
    memoryGameStarted = true;
    startMemoryButton.style.display = 'none';
    const currentQuestion = questions[currentQuestionIndex];
    memoryGameTimeLeft = currentQuestion.timeToView;
    timeRemainingElement.textContent = memoryGameTimeLeft;
    
    // Show cards face up first
    renderMemoryCards(true);
    
    // Start timer
    clearInterval(memoryGameTimer);
    memoryGameTimer = setInterval(() => {
        memoryGameTimeLeft--;
        timeRemainingElement.textContent = memoryGameTimeLeft;
        
        if (memoryGameTimeLeft <= 0) {
            clearInterval(memoryGameTimer);
            // Flip cards face down
            renderMemoryCards(false);
        }
    }, 1000);
}

// Render memory cards
function renderMemoryCards(showFront) {
    memoryCardsElement.innerHTML = '';
    
    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        if (showFront) cardElement.classList.add('flipped');
        if (memoryCardsFlipped.includes(index) && !showFront) {
            cardElement.classList.add('flipped');
            cardElement.classList.add('locked');
        }
        
        cardElement.innerHTML = `
            <div class="front">?</div>
            <div class="back">${card.value}</div>
        `;
        
        if (!showFront && !memoryCardsFlipped.includes(index)) {
            cardElement.addEventListener('click', () => {
                if (answered || memoryCardsFlipped.includes(index)) return;
                cardElement.classList.add('flipped');
                cardElement.classList.add('locked');
                memoryCardsFlipped.push(index);
                card.selected = true;
            });
        }
        
        memoryCardsElement.appendChild(cardElement);
    });
}

// Start pacman game
function startPacmanGame(gridSize, startPosition, answerPositions, obstaclePositions) {
    playerPosition = { ...startPosition };
    answers = [...answerPositions];
    obstacles = [...obstaclePositions];
    
    // Create grid
    gameGridElement.innerHTML = '';
    gameGridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    // Create answer labels
    pacmanAnswersElement.innerHTML = '';
    answers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'pacman-answer-item';
        answerItem.textContent = `${String.fromCharCode(65 + index)}: ${answer.value}`;
        pacmanAnswersElement.appendChild(answerItem);
    });
    
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            if (x === playerPosition.x && y === playerPosition.y) {
                const player = document.createElement('div');
                player.className = 'player';
                cell.appendChild(player);
            } else {
                // Check if this cell is an answer
                const answer = answers.find(a => a.x === x && a.y === y);
                if (answer) {
                    const answerIndex = answers.indexOf(answer);
                    const answerEl = document.createElement('div');
                    answerEl.className = 'answer-cell';
                    answerEl.textContent = String.fromCharCode(65 + answerIndex);
                    cell.appendChild(answerEl);
                    
                    // Add label
                    const label = document.createElement('div');
                    label.className = 'answer-label';
                    label.textContent = String.fromCharCode(65 + answerIndex);
                    cell.appendChild(label);
                } else if (obstacles.some(obs => obs.x === x && obs.y === y)) {
                    cell.classList.add('obstacle');
                }
            }
            
            gameGridElement.appendChild(cell);
        }
    }
}

// Start drag and drop game
function startDragDropGame(pairs) {
    dragItems = [];
    dropTargets = [];
    dragDropState = {};
    
    // Clear previous items
    dragItemsElement.innerHTML = '';
    dropTargetsElement.innerHTML = '';
    
    // Shuffle the pairs
    const shuffledPairs = shuffleArray([...pairs]);
    
    // Create drag items
    shuffledPairs.forEach(pair => {
        const dragItem = document.createElement('div');
        dragItem.className = 'drag-item';
        dragItem.textContent = pair.item;
        dragItem.draggable = true;
        dragItem.dataset.item = pair.item;
        
        dragItem.addEventListener('dragstart', (e) => {
            if (answered) return;
            e.dataTransfer.setData('text/plain', pair.item);
            e.dataTransfer.effectAllowed = 'move';
        });
        
        dragItemsElement.appendChild(dragItem);
        dragItems.push(dragItem);
    });
    
    // Create drop targets
    const shuffledTargets = shuffleArray([...pairs]);
    shuffledTargets.forEach(pair => {
        const dropTarget = document.createElement('div');
        dropTarget.className = 'drop-target';
        dropTarget.innerHTML = `<div class="drop-label">${pair.target}</div>`;
        dropTarget.dataset.target = pair.target;
        dropTarget.dataset.correctItem = pair.item;
        
        dropTarget.addEventListener('dragover', (e) => {
            if (answered) return;
            e.preventDefault();
            dropTarget.classList.add('hover');
        });
        
        dropTarget.addEventListener('dragleave', () => {
            dropTarget.classList.remove('hover');
        });
        
        dropTarget.addEventListener('drop', (e) => {
            if (answered) return;
            e.preventDefault();
            dropTarget.classList.remove('hover');
            
            const item = e.dataTransfer.getData('text/plain');
            
            // If this target already has an item, return it to the source
            if (dragDropState[dropTarget.dataset.target]) {
                const previousItem = dragDropState[dropTarget.dataset.target];
                const sourceItem = document.querySelector(`.drag-item[data-item="${previousItem}"]`);
                if (sourceItem) {
                    sourceItem.classList.remove('hidden');
                }
            }
            
            // Hide the dragged item from the source
            const sourceItem = document.querySelector(`.drag-item[data-item="${item}"]`);
            if (sourceItem) {
                sourceItem.classList.add('hidden');
            }
            
            // Remove any previous item from this target
            dropTarget.innerHTML = `<div class="drop-label">${pair.target}</div>`;
            
            // Create a new item for the drop target
            const newItem = document.createElement('div');
            newItem.className = 'drag-item';
            newItem.textContent = item;
            
            dropTarget.appendChild(newItem);
            dragDropState[dropTarget.dataset.target] = item;
        });
        
        dropTargetsElement.appendChild(dropTarget);
        dropTargets.push(dropTarget);
    });
}

// Handle keyboard input for pacman game
function handleKeyDown(event) {
    if (gameCompleted || questions[currentQuestionIndex].type !== 'pacman' || answered) return;
    
    const key = event.key.toLowerCase();
    const newPosition = { ...playerPosition };
    
    switch (key) {
        case 'w':
            newPosition.y--;
            break;
        case 's':
            newPosition.y++;
            break;
        case 'a':
            newPosition.x--;
            break;
        case 'd':
            newPosition.x++;
            break;
        default:
            return;
    }
    
    // Check if new position is valid
    if (newPosition.x >= 0 && newPosition.x < questions[currentQuestionIndex].gridSize &&
        newPosition.y >= 0 && newPosition.y < questions[currentQuestionIndex].gridSize &&
        !obstacles.some(obs => obs.x === newPosition.x && obs.y === newPosition.y)) {
        
        playerPosition = newPosition;
        startPacmanGame(questions[currentQuestionIndex].gridSize, playerPosition, answers, obstacles);
    }
}

// Render multiple choice options
function renderOptions(options, multiSelect) {
    optionsContainerElement.innerHTML = '';
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(button, option, multiSelect));
        optionsContainerElement.appendChild(button);
    });
}

// Render components for selection
function renderComponents(components) {
    componentsContainerElement.innerHTML = '';
    components.forEach(component => {
        const componentElement = document.createElement('div');
        componentElement.className = 'component';
        componentElement.dataset.id = component.id;
        
        componentElement.innerHTML = `
            <div class="component-icon">
                <i class="fas fa-${component.required ? 'bolt' : 'cube'}"></i>
            </div>
            <div class="component-name">${component.name}</div>
        `;
        
        componentElement.addEventListener('click', () => toggleComponent(componentElement, component.id));
        componentsContainerElement.appendChild(componentElement);
    });
}

// Toggle component selection
function toggleComponent(componentElement, componentId) {
    if (answered) return;
    
    componentElement.classList.toggle('selected');
    
    if (selectedComponents.includes(componentId)) {
        selectedComponents = selectedComponents.filter(id => id !== componentId);
    } else {
        selectedComponents.push(componentId);
    }
}

// Handle option selection
function selectOption(button, option, multiSelect) {
    if (answered) return;
    
    if (multiSelect) {
        // Toggle selection for multi-select
        button.classList.toggle('selected');
        
        if (selectedOptions.includes(option)) {
            selectedOptions = selectedOptions.filter(opt => opt !== option);
        } else {
            selectedOptions.push(option);
        }
    } else {
        // Single selection - remove selected class from all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        button.classList.add('selected');
        selectedOptions = [option];
    }
}

// Validate answer before checking
function validateAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    let isValid = true;
    let errorMessage = "";
    
    if (currentQuestion.type === 'multiple' && selectedOptions.length === 0) {
        isValid = false;
        errorMessage = "Please select an answer!";
    } else if (currentQuestion.type === 'components' && selectedComponents.length === 0) {
        isValid = false;
        errorMessage = "Please select at least one component!";
    } else if (currentQuestion.type === 'memory' && memoryCardsFlipped.length === 0) {
        isValid = false;
        errorMessage = "Please select at least one card!";
    } else if (currentQuestion.type === 'pacman') {
        const currentAnswer = answers.find(a => a.x === playerPosition.x && a.y === playerPosition.y);
        if (!currentAnswer) {
            isValid = false;
            errorMessage = "Please move to an answer area first!";
        }
    } else if (currentQuestion.type === 'dragdrop') {
        const allFilled = Object.keys(dragDropState).length === currentQuestion.pairs.length;
        if (!allFilled) {
            isValid = false;
            errorMessage = "Please drag all items to their targets!";
        }
    } else if (currentQuestion.type === 'wordle' && wordleAttempts === 0) {
        isValid = false;
        errorMessage = "Please make at least one guess!";
    } else if (currentQuestion.type === 'hangman' && hangmanGuessedLetters.length === 0) {
        isValid = false;
        errorMessage = "Please guess at least one letter!";
    }
    
    if (!isValid) {
        feedbackElement.textContent = errorMessage;
        feedbackElement.className = "feedback incorrect";
        return;
    }
    
    checkAnswer();
}

// Check if the answer is correct
function checkAnswer() {
    if (gameCompleted || answered) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.type === 'click') {
        isCorrect = clickCount === currentQuestion.answer;
    } else if (currentQuestion.type === 'multiple') {
        if (Array.isArray(currentQuestion.answer)) {
            // For multi-select questions
            isCorrect = arraysEqual(selectedOptions.sort(), currentQuestion.answer.sort());
        } else {
            // For single-select questions
            isCorrect = selectedOptions[0] === currentQuestion.answer;
        }
    } else if (currentQuestion.type === 'slider') {
        // Allow a small margin of error for slider questions
        isCorrect = Math.abs(sliderValue - currentQuestion.answer) <= 2;
    } else if (currentQuestion.type === 'components') {
        // Check if selected components match the required ones
        const requiredIds = currentQuestion.answer;
        isCorrect = requiredIds.length === selectedComponents.length &&
                    requiredIds.every(id => selectedComponents.includes(id));
    } else if (currentQuestion.type === 'memory') {
        // Check if all correct cards are selected and no incorrect ones
        const correctCards = memoryCards.filter(card => card.correct);
        const selectedCards = memoryCards.filter(card => card.selected);
        isCorrect = correctCards.length === selectedCards.length &&
                    correctCards.every(card => selectedCards.includes(card));
    } else if (currentQuestion.type === 'pacman') {
        // Check if player is on a correct answer cell
        const currentAnswer = answers.find(a => a.x === playerPosition.x && a.y === playerPosition.y);
        isCorrect = currentAnswer.correct;
    } else if (currentQuestion.type === 'dragdrop') {
        // Check if all drop targets are correctly filled
        let allCorrect = true;
        
        for (const target of dropTargets) {
            const currentItem = dragDropState[target.dataset.target];
            const correctItem = target.dataset.correctItem;
            
            if (currentItem === correctItem) {
                target.classList.add('correct');
            } else {
                target.classList.add('incorrect');
                allCorrect = false;
            }
        }
        
        isCorrect = allCorrect;
    } else if (currentQuestion.type === 'wordle') {
        // Wordle is already checked during gameplay
        isCorrect = wordleGuesses[wordleGuesses.length - 1] === currentQuestion.answer;
    } else if (currentQuestion.type === 'hangman') {
        // Hangman is already checked during gameplay
        isCorrect = Array.from(hangmanWordElement.children).every(el => el.textContent !== '');
    }
    
    // Mark as answered
    answered = true;
    disableQuestionInteractions();
    
    if (isCorrect) {
        // Correct answer
        score++;
        scoreElement.textContent = score;
        feedbackElement.innerHTML = "<i class='fas fa-check-circle'></i> Correct! Well done!";
        feedbackElement.className = "feedback correct";
        createCelebration();
    } else {
        // Incorrect answer
        let correctAnswer = '';
        if (currentQuestion.type === 'click') {
            correctAnswer = currentQuestion.answer;
        } else if (currentQuestion.type === 'multiple') {
            correctAnswer = Array.isArray(currentQuestion.answer) ? 
                currentQuestion.answer.join(', ') : currentQuestion.answer;
        } else if (currentQuestion.type === 'slider') {
            correctAnswer = currentQuestion.answer;
        } else if (currentQuestion.type === 'components') {
            const componentNames = currentQuestion.components
                .filter(c => currentQuestion.answer.includes(c.id))
                .map(c => c.name);
            correctAnswer = componentNames.join(', ');
        } else if (currentQuestion.type === 'memory') {
            const correctValues = memoryCards
                .filter(card => card.correct)
                .map(card => card.value);
            correctAnswer = correctValues.join(', ');
        } else if (currentQuestion.type === 'pacman') {
            const correctAnswerObj = answers.find(a => a.correct);
            correctAnswer = correctAnswerObj ? correctAnswerObj.value : '';
        } else if (currentQuestion.type === 'dragdrop') {
            correctAnswer = currentQuestion.pairs.map(p => `${p.item} → ${p.target}`).join(', ');
        } else if (currentQuestion.type === 'wordle') {
            correctAnswer = currentQuestion.answer;
        } else if (currentQuestion.type === 'hangman') {
            correctAnswer = currentQuestion.answer;
        }
        
        feedbackElement.innerHTML = `<i class='fas fa-times-circle'></i> Incorrect. The right answer was ${correctAnswer}.`;
        feedbackElement.className = "feedback incorrect";
    }
    
    // Show next button
    nextButton.style.display = 'block';
    submitButton.style.display = 'none';
    
    // Clear memory game timer
    if (currentQuestion.type === 'memory') {
        clearInterval(memoryGameTimer);
    }
}

// Disable question interactions after submit
function disableQuestionInteractions() {
    // Disable options
    document.querySelectorAll('.option').forEach(opt => {
        opt.disabled = true;
    });
    
    // Disable components
    document.querySelectorAll('.component').forEach(comp => {
        comp.classList.add('disabled');
    });
    
    // Disable slider
    sliderElement.disabled = true;
    
    // Disable memory cards
    document.querySelectorAll('.memory-card').forEach(card => {
        card.classList.add('disabled');
    });
    
    // Disable drag items
    document.querySelectorAll('.drag-item').forEach(item => {
        item.classList.add('disabled');
        item.draggable = false;
    });
    
    // Disable drop targets
    document.querySelectorAll('.drop-target').forEach(target => {
        target.classList.add('disabled');
    });
    
    // Disable click boxes
    decrementBoxElement.style.cursor = 'not-allowed';
    incrementBoxElement.style.cursor = 'not-allowed';
    decrementBoxElement.style.opacity = '0.7';
    incrementBoxElement.style.opacity = '0.7';
    
    // Disable Wordle input
    wordleInputElement.disabled = true;
    
    // Disable Hangman keyboard
    document.querySelectorAll('.hangman-key').forEach(key => {
        key.classList.add('used');
    });
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        updateProgress();
    } else {
        endGame();
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = `${progress}%`;
    progressPercentElement.textContent = `${Math.round(progress)}%`;
}

// End the game
function endGame() {
    gameCompleted = true;
    questionElement.textContent = "Game Completed!";
    questionTypeElement.style.display = 'none';
    clickAreaElement.style.display = 'none';
    optionsContainerElement.style.display = 'none';
    sliderContainerElement.style.display = 'none';
    componentsContainerElement.style.display = 'none';
    memoryGameContainerElement.style.display = 'none';
    pacmanGameContainerElement.style.display = 'none';
    dragDropContainerElement.style.display = 'none';
    wordleContainerElement.style.display = 'none';
    hangmanContainerElement.style.display = 'none';
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
    
    feedbackElement.innerHTML = `
        <div class="game-complete">
            <div class="trophy"><i class="fas fa-trophy"></i></div>
            <h2>Congratulations!</h2>
            <p>Your final score is ${score}/${questions.length}</p>
            <p>${score >= questions.length/2 ? 'Great job!' : 'Keep practicing!'}</p>
        </div>
    `;
    feedbackElement.className = "feedback";
    
    createCelebration();
}

// Reset the game
function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    clickCount = 0;
    gameCompleted = false;
    selectedOptions = [];
    selectedComponents = [];
    sliderValue = 50;
    
    scoreElement.textContent = score;
    questionTypeElement.style.display = 'block';
    
    // Clear any timers
    clearInterval(memoryGameTimer);
    
    showQuestion();
    updateProgress();
    
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
}

// Create celebration animation
function createCelebration() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const celebrate = document.createElement('div');
            celebrate.className = 'celebrate';
            celebrate.innerHTML = '<i class="fas fa-star"></i>';
            celebrate.style.left = `${Math.random() * 100}%`;
            celebrate.style.top = `${Math.random() * 100}%`;
            celebrate.style.fontSize = `${Math.random() * 2 + 1}rem`;
            document.querySelector('.container').appendChild(celebrate);
            
            // Animate
            celebrate.style.animation = 'celebrate 1s forwards';
            
            // Remove after animation
            setTimeout(() => {
                celebrate.remove();
            }, 1000);
        }, i * 100);
    }
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Utility function to compare arrays
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes growAndFade {
        0% { transform: scale(0); opacity: 0.7; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    @keyframes celebrate {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Function to simulate loading progress
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide splash screen and show main content
            splashScreen.classList.add('hidden');
            mainContainer.classList.add('visible');
            
            // Initialize the game after a short delay
            setTimeout(initGame, 300);
        }
        splashProgress.style.width = `${progress}%`;
    }, 200);
}

// Start the splash screen animation when the page loads
window.onload = simulateLoading;