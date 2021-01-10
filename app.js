// Variable declaration.
let userScore = 0;
let compScore = 0;
let decidingScore;
let winner = true;
let userName = '';
let newGame = document.getElementById('reset');

// Hide pop-up initially
newGame.style.display = 'none';

// Variables for HTML-DOM
const popup_div = document.querySelector('.popup');
const getUserName_input = document.getElementById('nameInput');
const getUserName_button = document.getElementById('okName');
const rounds_select = document.getElementById('rounds');
const userScore_div = document.getElementById('user-score');
const compScore_div = document.getElementById('comp-score');
const result_p = document.getElementById('output');
const userRock_div = document.getElementById('ur');
const userPaper_div = document.getElementById('up');
const userScissors_div = document.getElementById('us');
const compRock_div = document.getElementById('cr');
const compPaper_div = document.getElementById('cp');
const compScissors_div = document.getElementById('cs');

// Default selected options
var roundsToBePlayed = rounds_select.options[rounds_select.selectedIndex].value;

// To reset and start a new game.
function resetGame(userSelected) {
    userScore = compScore = 0;
    winner = true;
    userScore_div.innerHTML = compScore_div.innerHTML = 0;
    result_p.innerHTML = `Let's start playing.`;
    newGame.style.display = 'none';

    if (userSelected == undefined) {
        rounds_select.selectedIndex = 0;
        result_p.innerHTML = `Hii ${userName}, select the number of rounds you want to play.`;
    } else if (roundsToBePlayed == 'select') {
        result_p.innerHTML = `Hii ${userName}, Please select the number of rounds you want to play.`;
    }
}

// To reset the game when option is changed.
rounds_select.onchange = () => {
    roundsToBePlayed = rounds_select.options[rounds_select.selectedIndex].value;
    checkRound();
    resetGame(roundsToBePlayed);
}

// To check if proper value for number of rounds to be played is selected.
function checkRound() {
    if (roundsToBePlayed == 'select') {
        result_p.innerHTML = `Hii ${userName}, Please select the number of rounds you want to play.`;
        result_p.classList.add('red-round');
        return false;

    } else {
        result_p.innerHTML = `Let's start playing.`;
        result_p.classList.remove('red-round');
        return true;
    }
}

// To check the winner of the game.
function checkWinner() {
    let intUserScore = parseInt(userScore);
    let intCompScore = parseInt(compScore);
    let intRoundsToBePlayed = (parseInt(roundsToBePlayed)) / 2;

    if (intUserScore >= intRoundsToBePlayed) {
        result_p.innerHTML = `Congratualtions ${userName}. You are smarter than Computer.`;
        newGame.style.display = 'flex';
        winner = false;
    } else if (intCompScore >= intRoundsToBePlayed) {
        result_p.innerHTML = `You lost and it's not even AI. You SUCK!!`;
        newGame.style.display = 'flex';
        winner = false;
    }
}

// Convert the ID of user and computer choices to the equivalent value.
function convertToWord(choice) {
    if (choice === 'ur' || choice === 'cr') {
        return 'rock';
    } else if (choice === 'up' || choice === 'cp') {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Check if user has won the game.
function win(userChoice, compChoice) {
    userScore++;
    userScore_div.innerHTML = userScore;
    const userClick = convertToWord(userChoice);
    const compClick = convertToWord(compChoice);
    const userChoiceClicked = document.getElementById(userChoice);
    const compChoiceClicked = document.getElementById(compChoice);
    result_p.innerHTML = `You won with ${userClick} over computer's ${compClick}.`;
    userChoiceClicked.classList.add('green-glow');
    compChoiceClicked.classList.add('red-glow');
    setTimeout(() => {
        userChoiceClicked.classList.remove('green-glow');
        compChoiceClicked.classList.remove('red-glow');
    }, 300);
    checkWinner();
}

// check if user has lost the game.
function lose(userChoice, compChoice) {
    compScore++;
    compScore_div.innerHTML = compScore;
    const userClick = convertToWord(userChoice);
    const compClick = convertToWord(compChoice);
    const userChoiceClicked = document.getElementById(userChoice);
    const compChoiceClicked = document.getElementById(compChoice);
    result_p.innerHTML = `Computer won with ${compClick} over your ${userClick}.`;
    userChoiceClicked.classList.add('red-glow');
    compChoiceClicked.classList.add('green-glow');
    setTimeout(() => {
        userChoiceClicked.classList.remove('red-glow');
        compChoiceClicked.classList.remove('green-glow');
    }, 300);
    checkWinner();
}

// To check if game is draw.
function draw(userChoice, compChoice) {
    const userClick = convertToWord(userChoice);
    const userChoiceClicked = document.getElementById(userChoice);
    const compChoiceClicked = document.getElementById(compChoice);
    result_p.innerHTML = `It's a draw with both having ${userClick}.`;
    userChoiceClicked.classList.add('yellow-glow');
    compChoiceClicked.classList.add('yellow-glow');
    setTimeout(() => {
        userChoiceClicked.classList.remove('yellow-glow');
        compChoiceClicked.classList.remove('yellow-glow');
    }, 300);

}

// To randomly generate computer choices.
function getCompChoice() {
    const choices = ['cr', 'cp', 'cs'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

/*
This function gets user choice and check if user has won, lost or it's a draw
and then calls the respective function.
*/
function game(userChoice) {
    const compChoice = getCompChoice();

    switch (userChoice + compChoice) {
        case 'urcs':
        case 'upcr':
        case 'uscp':
            win(userChoice, compChoice);
            break;
        case 'urcp':
        case 'upcs':
        case 'uscr':
            lose(userChoice, compChoice);
            break;
        case 'urcr':
        case 'upcp':
        case 'uscs':
            draw(userChoice, compChoice);
            break;
    }
}

/*
Gets user's name from the input element in pop-up window 
and writes it to the result.
*/
function getName() {
    userName = getUserName_input.value;
    popup_div.style.display = 'none';
    result_p.innerHTML = `Hii ${userName}, select the number of rounds you want to play.`;
}

/*
Makes pop-up visible and calls getName function
Gets user choices.
*/
function main() {

    popup_div.style.display = 'flex';
    getUserName_button.addEventListener('click', () => getName());

    newGame.addEventListener('click', () => resetGame());
}

main();

function choiceClick(choice) {
    if (checkRound() && winner) {
        game(choice);
    } else if (!winner) {
        result_p.innerHTML = `Game is over. Select new game. `;
        newGame.style.display = 'block';
    }
}