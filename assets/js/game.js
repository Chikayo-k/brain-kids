//Add background image
document.body.style.background =
  'url("../assets/images/puzzle.png") center center/cover';

//Math game

let start = "false";
let level = 0;

// Show level 0 when the page load and set start true

window.addEventListener("load", function () {
  if (start) {
    let level_place = document.getElementsByClassName("level")[0];
    level_place.innerHTML = `Level ${level}`;
    start = true;
  }
});
