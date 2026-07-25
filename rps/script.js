// Score Trackers
let playerScore = 0;
let computerScore = 0;

// Grab elements from the HTML page layout
const statusText = document.getElementById('game-status');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');

// Core game loop execution function
function playGame(playerChoice) {
    const choices = ['✊', '✋', '✌️'];
    
    // Generates a random number index between 0 and 2 for the computer choice
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomIndex];

    let result = "";

    // Evaluate Win/Loss Conditions
    if (playerChoice === computerChoice) {
        result = "It's a tie! Both chose " + playerChoice;
    } else if (
        (playerChoice === '✊' && computerChoice === '✌️') ||
        (playerChoice === '✋' && computerChoice === '✊') ||
        (playerChoice === '✌️' && computerChoice === '✋')
    ) {
        playerScore++;
        result = "You win! " + playerChoice + " beats " + computerChoice;
    } else {
        computerScore++;
        result = "Computer wins! " + computerChoice + " beats " + playerChoice;
    }

    // Refresh structural view displays
    statusText.innerText = result;
    playerScoreDisplay.innerText = playerScore;
    computerScoreDisplay.innerText = computerScore;
}

// Reset everything back to zero values
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.innerText = '0';
    computerScoreDisplay.innerText = '0';
    statusText.innerText = 'Choose your weapon to start the match!';
}