//Add background image
document.body.style.background =
  'url("../assets/images/puzzle.png") center center/cover';

// //Math game

let start = false;
let level = 0;
let count = 0;
let score = 0;
let score_memory = [];
let life = 3;
let answer_number;
let level_place = document.getElementsByClassName("level")[0];

// Show level 0 when the page load and set start true

window.addEventListener("load", function () {
  if (!start) {
    level_place.innerHTML = `Level ${level}`;
    start = true;
    games_starts();
    display_score_life(score, life);
  }
});

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
    options_html += `<div class="display-answers">${options[i]}</div>`;
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
        let alt = "a bunny is happy";
        let file_name = "bunny";
        animation(file_name, alt);
        let sound_name = "correct";
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
  let sound = new Audio(`./assets/audio/${sound_name}.mp3`);
  sound.volume = 0.1;
  sound.duration = 0.1;
  sound.play();
}

/**
 * Add level by one and display.
 * then move on to the next question.
 */
function next_level() {
  count = 0;
  level++;
  level_place.innerHTML = `Level ${level}`;
  let sound_name = "clap";
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
  level = 0;

  //Display game over card
  let game_over_place = document.getElementsByClassName("game-screen")[0];
  let game_over_html = `<div class="game-over-div">
                            <p class="game-over">Game Over</p>
                            <p class="your-score">Your Score: ${score}<p>                      
                          <div class="game-option">
                            <a class="score-game" href="score.html">Score</a>
                            <a class="home" href="index.html">Home</a>
                          </div>
                       <div>`;
  game_over_place.innerHTML = game_over_html;

  //Play audio
  let sound_name = "game-over";
  sound_effect(sound_name);
}
