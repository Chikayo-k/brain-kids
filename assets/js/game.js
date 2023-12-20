//Add background image
document.body.style.background =
  'url("../assets/images/puzzle.png") center center/cover';

// //Math game

let start = "false";
let level = 0;
let count = 0;
let answer_number;

// Show level 0 when the page load and set start true

window.addEventListener("load", function () {
  if (start) {
    let level_place = document.getElementsByClassName("level")[0];
    level_place.innerHTML = `Level ${level}`;
    start = true;
    games_starts(level);
  }
});

/**
 * Game stars
 */
function games_starts(level) {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);

  //  Render additional questions and subtraction questions three times each.
  //  After that the level will increase.

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
    level++;
    // next_level(level);
  }
  console.log(answer());
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
    clicked_button[i].addEventListener("click", function (event) {
      let selected_ans = event.target.innerText;
      if (selected_ans == answer_number) {
        alert("Your answer is right");
        games_starts(level);
      } else {
        alert("Try it again");
      }
    });
  }
}
