// Global variables
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
let score = 0;
const finalScore = 30;
let time = 0;
let intervalId;
let timerId;

// Create a 6x6 grid
function createGrid() {
    game.innerHTML = ''; // Clear existing grid items
    for (let i = 0; i < 36; i++) { // Adjust to 36 items (6x6)
        const div = document.createElement('div');
        div.classList.add('grid-item');
        game.appendChild(div);
    }
}

// Highlight a random mole
function highlightMole() {
    const items = document.querySelectorAll('.grid-item');
    const randomIndex = Math.floor(Math.random() * items.length);

    items.forEach(item => item.classList.remove('mole')); // Remove mole from all items
    items[randomIndex].classList.add('mole'); // Add mole to a random item
}

// Function to handle mole whacking
function handleWhackMole(event) {
    if (event.target.classList.contains('mole')) {
        score++;
        scoreDisplay.textContent = score;
        highlightMole();
        
        if (score >= finalScore) {
            endGame('win'); // End the game with a win message
        }
    }
}

// Track time
function trackTime() {
    time++;
    if (time >= 60) { // 60 seconds
        endGame('lose'); // End the game with a lose message
    }
}

// Start or restart the game
function startGame() {
    createGrid();
    highlightMole(); // Highlight the first mole
    intervalId = setInterval(highlightMole, 1000); // Start mole highlighting interval
    timerId = setInterval(trackTime, 1000); // Start the timer
    game.addEventListener('click', handleWhackMole); // Add event listener for whacking moles
    score = 0; // Reset the score
    scoreDisplay.textContent = score; // Update the score display
    time = 0; // Reset the timer
}

// End the game with a given result
function endGame(result) {
    game.removeEventListener('click', handleWhackMole); // Remove the click event listener from the game
    clearInterval(intervalId); // Clear the interval
    clearInterval(timerId); // Clear the timer
    if (result === 'win') {
        alert(`Game Over! You win! Your final score is ${score}`);
    } else if (result === 'lose') {
        alert('Game Over! You lose!');
    }
}

// Reset the game
function resetGame() {
    endGame(); // End the game if it's currently running
    startGame(); // Restart the game
}

// Add click event listeners to the buttons
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
