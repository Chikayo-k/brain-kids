//Add background image
document.body.style.background =
  'url("../assets/images/puzzle.png") center center/cover';

// //Math game

let start = "false";
let level = 0;
let count = 0;

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
  //  After that the level will be up.

  if (count < 3) {
    show_addition(num1, num2);

    count++;
  } else if (count < 6) {
    show_subtraction(num1, num2);
    count++;
  } else {
    console.log("Next Level");
    level++;
    // next_level(level);
  }
  console.log(level);
}

/**
 * Display additional question
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
