window.addEventListener('load', init);

// Global variables

// Available Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// Dom element variables
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
    "cat", "dog", "hat", "cup", "run", "bed", "egg", "car", "bus", "pen", "fly", "tap", "box", "key", "rug", "fan", "bag", "map", "lip", "fun", "job", "kid", "bug", "toy", "van", "joy", "dot", "gum", "toe", "pie", "log", "hay", "ice", "quilt", "blimp", "flint", "grunt", "hump", "jolt", "khaki", "lunge", "mint", "nest", "plank", "quack", "rump", "shrimp", "twirl", "urban", "vest", "rhythm", "xylophone", "quixotic", "hyphen", "zodiac", "sphinx", "abyss", "eerie", "fjord", "havoc", "jukebox", "kiosk", "lymph", "nymph", "onyx", "phlegm", "queue", "rhubarb", "sclerosis", "synagogue", "thyme", "unwieldy", "vortex", "waxen", "yacht", "zealot", "brouhaha", "cacophony", "chutzpah", "debacle", "ennui", "fiasco", "galvanize", "haphazard", "impasse", "jamboree", "kowtow", "labyrinth", "macabre", "nonplussed", "oblivion", "pandemonium", "quandary", "recalcitrant", "serendipity", "truculent", "ubiquitous", "vagabond", "whimsical"
  ];
  

// Initialize Game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // Highscore based on score value for Session Storage
    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
    } else {
        sessionStorage['highscore'] = sessionStorage['highscore']
    }

    // Prevent display of Highscore: -1
    if (sessionStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = sessionStorage['highscore'];
    }

    // If score is -1, display 0
    if(score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// Pick & show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if(time > 0) {
        // Decrement
        time--;
    } else if(time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if(!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}