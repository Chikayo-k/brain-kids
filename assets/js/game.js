"use strict";

// background images storage
const background_img = {
  type1: `url("./assets/images/star.webp") center center/cover`,
  type2: `url("./assets/images/puzzle.png") center center/cover`,
};

/**
 * Add background image when the screen size is over 576px and remove when not
 */
function change_background(size, background_img) {
  if (size.matches) {
    document.body.style.background = background_img;
  } else {
    document.body.style.background = "none";
  }
}

const size = window.matchMedia("(min-width: 576px)");

change_background(size, background_img.type1);

if (document.URL) {
  size.addEventListener("change", function () {
    change_background(size, background_img.type1);
  });
}

//Set the sound button functionality

let audio_button = document.getElementsByClassName("sound");
let audio_count = 0;
let audio;
let audio_name;
let audio_playing = false;

/**
 * Play audio
 */
function play_audio(sound_name) {
  if (audio_playing === true)
    audio = new Audio(`./assets/audio/${sound_name}.mp3`);
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
  audio_count = 0;
}

if (document.URL) {
  audio_button[0].addEventListener("click", function () {
    audio_count++;
    if (audio_count <= 1 && audio_playing == false) {
      audio_playing = true;
      audio_name = "background-track";
      play_audio(audio_name);
      //Change the speaker icon
      audio_button[0].classList.remove("fa-volume-xmark");
      audio_button[0].classList.add("fa-volume-high");
    } else {
      stop_audio();
      audio_playing = false;
      //change the speaker icon
      audio_button[0].classList.remove("fa-volume-high");
      audio_button[0].classList.add("fa-volume-xmark");
    }
  });
}

//Game variables
let start = false;
let level = 0;
let num1;
let count = 0;
let score = 0;
let file_name;
let sound_name;
let alt;
let score_memory = [];
let life = 3;
let answer_number;
let level_place = document.getElementsByClassName("level")[0];
const game_page = document.getElementsByClassName("game")[0];
const start_page = document.getElementsByClassName("start-page")[0];
const game_over_page = document.getElementsByClassName("game-over")[0];

//Start button functionality

/**
 * Start page will be updated to the game page
 * and game starts
 */
function show_game_Page() {
  //Change the background music
  if (audio_playing == true) {
    stop_audio();
    audio_name = "game-background";
    play_audio(audio_name);
  }
  //Show game page and hide start page
  game_page.classList.remove("game-hide");
  start_page.classList.add("start-hide");
  //hide signup button
  signup_btn.classList.add("hide");

  //Background changes
  change_background(size, background_img.type2);
  if (document.URL) {
    size.addEventListener("change", function () {
      change_background(size, background_img.type2);
    });
  }

  //Start game settings
  if (!start) {
    level_place.innerHTML = `Level ${level}`;
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
    console.log("Next Level");
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
  let question_num1 = parseInt(document.getElementById("num1").innerText);
  let question_num2 = parseInt(document.getElementById("num2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    let answer = question_num1 + question_num2;
    return (answer_number = answer);
  } else if (operator === "-") {
    let answer = question_num1 - question_num2;
    return (answer_number = answer);
  } else {
    alert("something went wrong");
    throw "something went wrong";
  }
}

/**
 * Generate 3 random numbers plus the correct answer and places in a random position each time
 */
function option_numbers() {
  let correct_answer = answer();
  let options = [correct_answer];

  for (let i = 0; options.length < 4; i++) {
    const number = Math.floor(Math.random() * 5) + correct_answer;

    if (!options.includes(number)) {
      options.push(number);
    }
  }
  let shuffle_options = options.sort(() => Math.random() - 0.5);
  return shuffle_options;
}

/**
 * Display answer options
 */
function display_options() {
  let options = option_numbers();
  console.log(options);
  let options_html = "";

  for (let i in options) {
    options_html += `<div class="display-answers btn">${options[i]}</div>`;
  }
  document.getElementById("pick-answer").innerHTML = options_html;

  check_answer();
}

/**
 * Check if the answer is correct or not and display result
 */
function check_answer() {
  let clicked_button = document.querySelectorAll(".display-answers");

  for (let i = 0; i < clicked_button.length; i++) {
    clicked_button[i].addEventListener("click", function () {
      let selected_ans = parseInt(this.innerText);
      if (selected_ans === answer_number) {
        games_starts(level);
        alt = "a bunny is happy";
        file_name = "bunny";
        animation(file_name, alt);
        sound_name = "correct";
        sound_effect(sound_name);

        //Increase the score by one
        score++;
        display_score_life(score, life);
      } else if (life === 1) {
        game_over();
      } else {
        alt = "a bunny is encouraging";
        file_name = "encouraging";
        animation(file_name, alt);
        sound_name = "mistake";
        sound_effect(sound_name);

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
  let display_place = document.getElementsByClassName("animation-hide")[0];
  let animation_html = ` <img src="./assets/images/${name}.webp" alt="${alt}">`;

  display_place.innerHTML = animation_html;

  display_place.classList.remove("animation-hide");

  setTimeout(function () {
    display_place.classList.add("animation-hide");
  }, 700);
}

/**
 * Play sound effect
 */
function sound_effect(sound_name) {
  if (audio_playing === true) {
    let sound = new Audio(`./assets/audio/${sound_name}.mp3`);
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
  level_place.innerHTML = `Level ${level}`;
  sound_name = "clap";
  sound_effect(sound_name);
  games_starts();
}

/**
 * Display Score and Life
 */
function display_score_life(score, life) {
  let score_life_place = document.getElementsByClassName("score-level")[0];
  let score_life_html = `<p>Score: ${score}</p><p>Life: ${life}</p>`;
  score_life_place.innerHTML = score_life_html;
}

/**
 *Display game over pop up and audio when game ends
 */
function game_over() {
  count = 0;

  if (audio_playing == true) {
    stop_audio();
    //Play audio
    audio_name = "game-over";
    play_audio(audio_name);
  }
  score_memory.push(score);
  console.log(score_memory);

  //Display game over card
  show_game_over();

  //home button
  const home_button = document.getElementsByClassName("home")[0];
  home_button.addEventListener("click", show_start_Page);
}

/**
 * Game over page will be displayed
 */
function show_game_over() {
  const your_score = document.getElementsByClassName("your-score")[0];
  your_score.innerHTML = `Your score is: ${score}`;
  game_over_page.classList.toggle("game-over-hide");
  game_page.classList.toggle("game-hide");
}

/**
 * Game over page will be updated to the start page
 */
function show_start_Page() {
  if (audio_playing === true) {
    stop_audio();
    audio_name = "background-track";
    play_audio(audio_name);
  }

  //Reset score and life
  score = 0;
  life = 3;
  level = 0;
  display_score_life(score, life);
  level_place.innerHTML = `Level ${level}`;

  //Show game page and hide start page and sign up button
  start_page.classList.toggle("start-hide");
  game_over_page.classList.toggle("game-over-hide");
  signup_btn.classList.remove("hide");

  //Background changes
  change_background(size, background_img.type1);
  if (document.URL) {
    size.addEventListener("change", function () {
      change_background(size, background_img.type1);
    });
  }
}

//Score board

let score_table;

/**
 * Display scores on the table
 */
function show_score_board() {
  score_table = document.createElement("table");
  score_table.id = "scoreboard";

  let score_table_html = `
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

  score_table.innerHTML = score_table_html;

  const score_tbody = score_table.getElementsByTagName("tbody")[0];

  let table_html = "";
  for (let i = 0; i < score_memory.length; i++) {
    table_html += `
    <tr>
      <td>Attempt:${i + 1}</td>
      <td>${score_memory[i]}</td>
    </tr>  
  `;
  }

  score_tbody.innerHTML = table_html;

  const score_place = document.getElementById("score-board");
  score_place.appendChild(score_table);

  //Hide signup button and start page
  start_page.classList.add("start-hide");
  signup_btn.classList.add("hide");

  /**
   * Remove score table
   */
  function delete_table() {
    //Remove score table
    score_table.remove();
    //Show sign up button and start page
    start_page.classList.remove("start-hide");
    signup_btn.classList.remove("hide");
  }

  const back_btn = document.getElementById("back");
  back_btn.addEventListener("click", delete_table);
}

const score_btn = document.getElementsByClassName("score")[0];
score_btn.addEventListener("click", show_score_board);
