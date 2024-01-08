// jshint esversion: 6
// background images storage
const backgroundImg = {
  type1: `url("./assets/images/star.webp") center center/cover`,
  type2: `url("./assets/images/puzzle.webp") center center/cover`,
};

/**
 * Add background image when the screen size is over 576px and remove when not
 */
function changeBackground(size, backgroundImg) {
  if (size.matches) {
    document.body.style.background = backgroundImg;
  } else {
    document.body.style.background = "none";
  }
}

const size = window.matchMedia("(min-width: 576px)");

changeBackground(size, backgroundImg.type1);

if (document.URL) {
  size.addEventListener("change", function () {
    changeBackground(size, backgroundImg.type1);
  });
}

//Set the sound button functionality
let audioButton = document.getElementsByClassName("sound");
let audioCount = 0;
let audio;
let audioName;
let audioPlaying = false;

/**
 * Play audio
 */
function playAudio(soundName) {
  if (audioPlaying === true) {
    audio = new Audio(`./assets/audio/${soundName}.mp3`);
    audio.play();
    audio.loop = true;
    audio.volume = 0.08;
  }
}

/**
 * Stop audio
 */
function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  audioCount = 0;
}

if (document.URL) {
  audioButton[0].addEventListener("click", function () {
    audioCount++;
    if (audioCount <= 1 && audioPlaying == false) {
      audioPlaying = true;
      audioName = "background-track";
      playAudio(audioName);
      //Change the speaker icon
      audioButton[0].classList.remove("fa-volume-xmark");
      audioButton[0].classList.add("fa-volume-high");
    } else {
      stopAudio();
      audioPlaying = false;
      //change the speaker icon
      audioButton[0].classList.remove("fa-volume-high");
      audioButton[0].classList.add("fa-volume-xmark");
    }
  });
}

//Game variables
let start = false;
let level = 0;
let num1;
let count = 0;
let score = 0;
let fileName;
let soundName;
let alt;
let scoreMemory = [];
let life = 3;
let answerNumber;
const levelPlace = document.getElementsByClassName("level")[0];
const gamePage = document.getElementsByClassName("game")[0];
const startPage = document.getElementsByClassName("start-page")[0];
const gameOverPage = document.getElementsByClassName("game-over")[0];
//Import signup button variable from signup.js
import { signupBtn } from "./signup.js";

//Start button functionality

/**
 * Start page will be updated to the game page
 * and game starts
 */
function showGamePage() {
  //Change the background music
  if (audioPlaying == true) {
    stopAudio();
    audioName = "game-background";
    playAudio(audioName);
  }
  //Show game page and hide start page
  gamePage.classList.remove("game-hide");
  startPage.classList.add("start-hide");

  //hide signup button
  signupBtn.classList.add("hide");

  //Background changes
  changeBackground(size, backgroundImg.type2);
  if (document.URL) {
    size.addEventListener("change", function () {
      changeBackground(size, backgroundImg.type2);
    });
  }

  //Start game settings
  if (!start) {
    levelPlace.innerHTML = `Level ${level}`;
    start = true;
    gameStarts();
    displayScoreLife(score, life);
  }
}

const startBtn = document.getElementsByClassName("start-btn")[0];
startBtn.addEventListener("click", showGamePage);

/**
 * Game stars
 */
function gameStarts() {
  //  Render additional questions and subtraction questions three times each.
  //  After that the level will increase.

  let num1 = generateNum(level);
  let num2 = generateNum(level);

  if (count <= 2) {
    showAddition(num1, num2);
    displayOptions();
    answer();
    count++;
  } else if (count <= 4) {
    showSubtraction(num1, num2);
    displayOptions();
    count++;
  } else {
    showSubtraction(num1, num2);
    displayOptions();
    nextLevel();
  }
}

/**
 * Generate numbers for math quiz
 */
function generateNum(level) {
  let difficulty = 5 * level;
  return (num1 = Math.floor(Math.random() * 10) + difficulty);
}

/**
 * Display addition question
 */
function showAddition(num1, num2) {
  document.getElementById("num1").innerHTML = num1;
  document.getElementById("num2").innerHTML = num2;
  document.getElementById("operator").innerHTML = "+";
}

/**
 * Display subtraction question
 */
function showSubtraction(num1, num2) {
  document.getElementById("num1").innerHTML = num1 > num2 ? num1 : num2;
  document.getElementById("num2").innerHTML = num2 < num1 ? num2 : num1;
  document.getElementById("operator").innerHTML = "-";
}

/**
 * Calculate the answer
 */
function answer() {
  let questionNum1 = parseInt(document.getElementById("num1").innerText);
  let questionNum2 = parseInt(document.getElementById("num2").innerText);
  let operator = document.getElementById("operator").innerText;
  let answer;

  if (operator === "+") {
    answer = questionNum1 + questionNum2;
    return (answerNumber = answer);
  } else if (operator === "-") {
    answer = questionNum1 - questionNum2;
    return (answerNumber = answer);
  }
}

/**
 * Generate 3 random numbers plus the correct answer and places in a random position each time
 */
function optionNumbers() {
  let correctAnswer = answer();
  let options = [correctAnswer];

  for (let i = 0; options.length < 4; i++) {
    const number = Math.floor(Math.random() * 5) + correctAnswer;

    if (!options.includes(number)) {
      options.push(number);
    }
  }
  //Shuffling an array
  //https://medium.com/@apestruy/shuffling-an-array-in-javascript-8fcbc5ff12c7
  let shuffleOptions = options.sort(() => Math.random() - 0.5);
  return shuffleOptions;
}

/**
 * Display answer options
 */
function displayOptions() {
  let options = optionNumbers();
  let optionsHtml = "";

  for (let i = 0; i < options.length; i++) {
    optionsHtml += `<div class="display-answers btn">${options[i]}</div>`;
  }
  document.getElementById("pick-answer").innerHTML = optionsHtml;

  checkAnswer();
}

let selectedAnswer;

/**
 * Check if the answer is correct or not and display result
 */
function checkAnswer() {
  const clickedButton = document.querySelectorAll(".display-answers");

  for (let i = 0; i < clickedButton.length; i++) {
    clickedButton[i].addEventListener("click", function () {
      selectedAnswer = parseInt(this.innerText);
      if (selectedAnswer === answerNumber) {
        gameStarts(level);
        alt = "a bunny is happy";
        fileName = "bunny";
        animation(fileName, alt);
        soundName = "correct";
        soundEffect(soundName);

        //Increase the score by one
        score++;
        displayScoreLife(score, life);
      } else if (life === 1) {
        gameOver();
      } else {
        alt = "a bunny is encouraging";
        fileName = "encouraging";
        animation(fileName, alt);
        soundName = "mistake";
        soundEffect(soundName);

        //Decrease the life by one
        life--;
        displayScoreLife(score, life);
      }
    });
  }
}

/**
 *show animation 0.7 seconds
 */
function animation(name, alt) {
  const displayPlace = document.getElementsByClassName("animation-hide")[0];
  let animationHtml = ` <img src="./assets/images/${name}.webp" alt="${alt}">`;

  try {
    displayPlace.innerHTML = animationHtml;

    displayPlace.classList.remove("animation-hide");

    setTimeout(function () {
      displayPlace.classList.add("animation-hide");
    }, 700);
  } catch (err) {
    //Gets an error message if you click answer before the animation displaying beforehand has gone
  }
}

/**
 * Change colour of the text
 */
function wordStandOut(word) {
  word.classList.add("change-colour");
  setTimeout(function () {
    word.classList.remove("change-colour");
  }, 1000);
}
/**
 * Play sound effect
 */
function soundEffect(soundName) {
  if (audioPlaying === true) {
    let sound = new Audio(`./assets/audio/${soundName}.mp3`);
    sound.volume = 0.1;
    sound.play();
  }
}

/**
 * Add level by one and display.
 * then move on to the next question.
 */
function nextLevel() {
  count = 0;
  level++;
  levelPlace.innerHTML = `Level ${level}`;
  soundName = "clap";
  soundEffect(soundName);
  wordStandOut(levelPlace);
}

/**
 * Display Score and Life
 */
function displayScoreLife(score, life) {
  const scoreLifePlace = document.getElementsByClassName("score-level")[0];
  let scoreLifeHtml = `<p>Score: ${score}</p><p>Life: ${life}</p>`;
  scoreLifePlace.innerHTML = scoreLifeHtml;
}

/**
 *Display game over pop up and audio when game ends
 */
function gameOver() {
  count = 0;
  start = false;

  if (audioPlaying == true) {
    stopAudio();
    //Play audio
    audioName = "game-over";
    playAudio(audioName);
  }
  scoreMemory.push(score);

  //Display game over card
  showGameOver();

  //home button
  const homeButton = document.getElementsByClassName("home")[0];
  homeButton.addEventListener("click", showStartPageAgain);

  //Store the highest score in a local storage
  let scoreStorageValue = localStorage.getItem("highestScore");

  if (scoreStorageValue < score) {
    localStorage.setItem("highestScore", score);
  }
}

/**
 * Game over page will be displayed
 */
function showGameOver() {
  const yourScore = document.getElementsByClassName("your-score")[0];
  yourScore.innerHTML = `Your score is: ${score}`;
  gameOverPage.classList.toggle("game-over-hide");
  gamePage.classList.toggle("game-hide");
}

/**
 * Game over page will be updated to the start page
 */
function showStartPageAgain() {
  if (audioPlaying === true) {
    stopAudio();
    audioName = "background-track";
    playAudio(audioName);
  }

  //Reset score and life
  score = 0;
  life = 3;
  level = 0;

  displayScoreLife(score, life);
  levelPlace.innerHTML = `Level ${level}`;

  //Show game page and hide start page and sign up button
  startPage.classList.toggle("start-hide");
  gameOverPage.classList.toggle("game-over-hide");
  signupBtn.classList.remove("hide");

  //Background changes
  changeBackground(size, backgroundImg.type1);
  if (document.URL) {
    size.addEventListener("change", function () {
      changeBackground(size, backgroundImg.type1);
    });
  }
}

//Score board

let scoreTable;

/**
 * Display scores on the table
 */
function showScoreBoard() {
  //Set a variable of local storage value
  let highestScoreNow;
  if (localStorage.getItem("highestScore") <= 0) {
    highestScoreNow = 0;
  } else {
    highestScoreNow = localStorage.getItem("highestScore");
  }

  //Display the highest score and a reset all score button
  const createHighestScoreDiv = document.createElement("div");
  createHighestScoreDiv.id = "highest-div";
  createHighestScoreDiv.innerHTML = `<h2>Highest Score:${highestScoreNow}</h2> 
                                     <button id="reset" class="btn" aria-label="Reset all scores">Reset All</button>
                                    `;

  const highestScorePlace = document.getElementById("highest-score");
  highestScorePlace.appendChild(createHighestScoreDiv);

  scoreTable = document.createElement("table");
  scoreTable.id = "scoreboard";

  let scoreTableHtml = `
  <thead>
    <tr>
      <td>Attempt</td>
      <td>Score</td>
    </tr>
  </thead>
  <tbody>
  <tbody>    
  <button id="back" class="btn" aria-label="Back to Home page">Back</button> 
  `;

  scoreTable.innerHTML = scoreTableHtml;

  const scoreTbody = scoreTable.getElementsByTagName("tbody")[0];

  let tableHtml = "";
  for (let i = 0; i < scoreMemory.length; i++) {
    tableHtml += `
    <tr>
      <td>Attempt:${i + 1}</td>
      <td>${scoreMemory[i]}</td>
    </tr>  
  `;
  }

  scoreTbody.innerHTML = tableHtml;

  const scorePlace = document.getElementById("score-board");
  scorePlace.appendChild(scoreTable);

  //Hide signup button and start page
  startPage.classList.add("start-hide");
  signupBtn.classList.add("hide");

  /**
   * Remove score table
   */
  function deleteTable() {
    //Remove score table and highest score
    scoreTable.remove();
    createHighestScoreDiv.remove();
    //Show sign up button and start page
    startPage.classList.remove("start-hide");
    signupBtn.classList.remove("hide");
  }

  const backBtn = document.getElementById("back");
  backBtn.addEventListener("click", deleteTable);

  /**
   * Remove the value of highest score in the local storage
   * and display highest score 0
   */
  function resetHighestScore() {
    localStorage.setItem("highestScore", 0);
    highestScoreNow = localStorage.getItem("highestScore");
    createHighestScoreDiv.innerHTML = `<h2>Highest Score:${highestScoreNow}</h2> 
    <button id="reset" class="btn" aria-label="Reset all scores">Reset All</button>`;

    highestScorePlace.appendChild(createHighestScoreDiv);

    //Empty score  memory array and remove display
    scoreMemory = [];
    scoreTbody.remove();
  }

  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", resetHighestScore);
}

const scoreBtn = document.getElementsByClassName("score")[0];
scoreBtn.addEventListener("click", showScoreBoard);

export { startPage };
