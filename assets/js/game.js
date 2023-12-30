"use strict";

// background images storage
const backgroundImg = {
  type1: `url("./assets/images/star.webp") center center/cover`,
  type2: `url("./assets/images/puzzle.webp") center center/cover`,
};

/**
 * Add background image when the screen size is over 576px and remove when not
 */
function change_background(size, backgroundImg) {
  if (size.matches) {
    document.body.style.background = backgroundImg;
  } else {
    document.body.style.background = "none";
  }
}

const size = window.matchMedia("(min-width: 576px)");

change_background(size, backgroundImg.type1);

if (document.URL) {
  size.addEventListener("change", function () {
    change_background(size, backgroundImg.type1);
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
function play_audio(soundName) {
  if (audioPlaying === true)
    audio = new Audio(`./assets/audio/${soundName}.mp3`);
  audio.play();
  audio.loop = true;
  audio.volume = 0.08;
}

/**
 * Stop audio
 */
function stop_audio() {
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
      play_audio(audioName);
      //Change the speaker icon
      audioButton[0].classList.remove("fa-volume-xmark");
      audioButton[0].classList.add("fa-volume-high");
    } else {
      stop_audio();
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
let levelPlace = document.getElementsByClassName("level")[0];
const gamePage = document.getElementsByClassName("game")[0];
const startPage = document.getElementsByClassName("start-page")[0];
const gameOverPage = document.getElementsByClassName("game-over")[0];

//Start button functionality

/**
 * Start page will be updated to the game page
 * and game starts
 */
function show_game_Page() {
  //Change the background music
  if (audioPlaying == true) {
    stop_audio();
    audioName = "game-background";
    play_audio(audioName);
  }
  //Show game page and hide start page
  gamePage.classList.remove("game-hide");
  startPage.classList.add("start-hide");

  //hide signup button
  signupBtn.classList.add("hide");

  //Background changes
  change_background(size, backgroundImg.type2);
  if (document.URL) {
    size.addEventListener("change", function () {
      change_background(size, backgroundImg.type2);
    });
  }

  //Start game settings
  if (!start) {
    levelPlace.innerHTML = `Level ${level}`;
    start = true;
    games_starts();
    display_score_life(score, life);
  }
}

const start_button = document.getElementsByClassName("start-btn")[0];
start_button.addEventListener("click", show_game_Page);

/**
 * Game stars
 */
function games_starts() {
  //  Render additional questions and subtraction questions three times each.
  //  After that the level will increase.

  let num1 = generate_num(level);
  let num2 = generate_num(level);

  if (count < 3) {
    show_addition(num1, num2);
    display_options();
    answer();
    count++;
  } else if (count < 6) {
    show_subtraction(num1, num2);
    display_options();
    count++;
  } else {
    next_level();
  }
}

/**
 * Generate numbers for math quiz
 */
function generate_num(level) {
  let difficulty = 5 * level;
  return (num1 = Math.floor(Math.random() * 10) + difficulty);
}

/**
 * Display addition question
 */
function show_addition(num1, num2) {
  document.getElementById("num1").innerHTML = num1;
  document.getElementById("num2").innerHTML = num2;
  document.getElementById("operator").innerHTML = "+";
}

/**
 * Display subtraction question
 */
function show_subtraction(num1, num2) {
  document.getElementById("num1").innerHTML = num1 > num2 ? num1 : num2;
  document.getElementById("num2").innerHTML = num2 < num1 ? num2 : num1;
  document.getElementById("operator").innerHTML = "-";
}

/**
 * Calculate the answer
 */
function answer() {
  let questionNum1 = parseInt(document.getElementById("num1").innerText);
  let question_num2 = parseInt(document.getElementById("num2").innerText);
  let operator = document.getElementById("operator").innerText;
  let answer;

  if (operator === "+") {
    answer = questionNum1 + question_num2;
    return (answerNumber = answer);
  } else if (operator === "-") {
    answer = questionNum1 - question_num2;
    return (answerNumber = answer);
  } else {
    alert("something went wrong");
    throw "something went wrong";
  }
}

/**
 * Generate 3 random numbers plus the correct answer and places in a random position each time
 */
function option_numbers() {
  let correctAnswer = answer();
  let options = [correctAnswer];

  for (let i = 0; options.length < 4; i++) {
    const number = Math.floor(Math.random() * 5) + correctAnswer;

    if (!options.includes(number)) {
      options.push(number);
    }
  }
  // Shuffling an array
  //https://medium.com/@apestruy/shuffling-an-array-in-javascript-8fcbc5ff12c7
  let shuffleOptions = options.sort(() => Math.random() - 0.5);
  return shuffleOptions;
}

/**
 * Display answer options
 */
function display_options() {
  let options = option_numbers();
  let optionsHtml = "";

  for (let i in options) {
    optionsHtml += `<div class="display-answers btn">${options[i]}</div>`;
  }
  document.getElementById("pick-answer").innerHTML = optionsHtml;

  check_answer();
}

/**
 * Check if the answer is correct or not and display result
 */
function check_answer() {
  let clickedButton = document.querySelectorAll(".display-answers");

  for (let i = 0; i < clickedButton.length; i++) {
    clickedButton[i].addEventListener("click", function () {
      let selected_ans = parseInt(this.innerText);
      if (selected_ans === answerNumber) {
        games_starts(level);
        alt = "a bunny is happy";
        fileName = "bunny";
        animation(fileName, alt);
        soundName = "correct";
        sound_effect(soundName);

        //Increase the score by one
        score++;
        display_score_life(score, life);
      } else if (life === 1) {
        game_over();
      } else {
        alt = "a bunny is encouraging";
        fileName = "encouraging";
        animation(fileName, alt);
        soundName = "mistake";
        sound_effect(soundName);

        //Decrease the life by one
        life--;
        display_score_life(score, life);
      }
    });
  }
}

/**
 *show animation 1.5 seconds
 */
function animation(name, alt) {
  let displayPlace = document.getElementsByClassName("animation-hide")[0];
  let animationHtml = ` <img src="./assets/images/${name}.webp" alt="${alt}">`;

  try {
    displayPlace.innerHTML = animationHtml;

    displayPlace.classList.remove("animation-hide");

    setTimeout(function () {
      displayPlace.classList.add("animation-hide");
    }, 700);
  } catch (err) {
    //Gets an error message if you click answer before the animation displaying beforehand has gone
    console.log(
      "Error: Due to clicking the new answer before the animation has finished"
    );
  }
}

/**
 * Play sound effect
 */
function sound_effect(soundName) {
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
function next_level() {
  count = 0;
  level++;
  levelPlace.innerHTML = `Level ${level}`;
  soundName = "clap";
  sound_effect(soundName);
  games_starts();
}

/**
 * Display Score and Life
 */
function display_score_life(score, life) {
  let scoreLifePlace = document.getElementsByClassName("score-level")[0];
  let scoreLifeHtml = `<p>Score: ${score}</p><p>Life: ${life}</p>`;
  scoreLifePlace.innerHTML = scoreLifeHtml;
}

/**
 *Display game over pop up and audio when game ends
 */
function game_over() {
  count = 0;

  if (audioPlaying == true) {
    stop_audio();
    //Play audio
    audioName = "game-over";
    play_audio(audioName);
  }
  scoreMemory.push(score);

  //Display game over card
  show_game_over();

  //home button
  const homeButton = document.getElementsByClassName("home")[0];
  homeButton.addEventListener("click", show_start_Page);

  //Store the highest score in a local storage
  let scoreStorageValue = localStorage.getItem("highestScore");

  if (scoreStorageValue < score) {
    localStorage.setItem("highestScore", score);
  }
}

/**
 * Game over page will be displayed
 */
function show_game_over() {
  const yourScore = document.getElementsByClassName("your-score")[0];
  yourScore.innerHTML = `Your score is: ${score}`;
  gameOverPage.classList.toggle("game-over-hide");
  gamePage.classList.toggle("game-hide");
}

/**
 * Game over page will be updated to the start page
 */
function show_start_Page() {
  if (audioPlaying === true) {
    stop_audio();
    audioName = "background-track";
    play_audio(audioName);
  }

  //Reset score and life
  score = 0;
  life = 3;
  level = 0;
  display_score_life(score, life);
  levelPlace.innerHTML = `Level ${level}`;

  //Show game page and hide start page and sign up button
  startPage.classList.toggle("start-hide");
  gameOverPage.classList.toggle("game-over-hide");
  signupBtn.classList.remove("hide");

  //Background changes
  change_background(size, backgroundImg.type1);
  if (document.URL) {
    size.addEventListener("change", function () {
      change_background(size, backgroundImg.type1);
    });
  }
}

//Score board

let scoreTable;

/**
 * Display scores on the table
 */
function show_score_board() {
  //Set a variable of local storage value
  let highestScoreNow;
  if (localStorage.getItem("highestScore") <= 0) {
    highestScoreNow = 0;
  } else {
    highestScoreNow = localStorage.getItem("highestScore");
  }

  //Display the highest score and a reset highest score button
  const createHighestScoreDiv = document.createElement("div");
  createHighestScoreDiv.id = "highest-div";
  createHighestScoreDiv.innerHTML = `<h2>Highest Score:${highestScoreNow}</h2> 
                                     <button id="reset" class="btn">Reset All</button>
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
  <button id="back" class="btn">Back</button> 
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
  function delete_table() {
    //Remove score table and highest score
    scoreTable.remove();
    createHighestScoreDiv.remove();
    //Show sign up button and start page
    startPage.classList.remove("start-hide");
    signupBtn.classList.remove("hide");
  }

  const backBtn = document.getElementById("back");
  backBtn.addEventListener("click", delete_table);

  /**
   * Remove the value of highest score in the local storage
   * and display highest score 0
   */
  function resetHighestScore() {
    localStorage.setItem("highestScore", 0);
    highestScoreNow = localStorage.getItem("highestScore");
    createHighestScoreDiv.innerHTML = `<h2>Highest Score:${highestScoreNow}</h2> 
    <button id="reset" class="btn">Reset Highest Score</button>`;

    highestScorePlace.appendChild(createHighestScoreDiv);

    //Empty score  memory array and remove display
    scoreMemory = [];
    scoreTbody.remove();
  }

  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", resetHighestScore);
}

const scoreBtn = document.getElementsByClassName("score")[0];
scoreBtn.addEventListener("click", show_score_board);
