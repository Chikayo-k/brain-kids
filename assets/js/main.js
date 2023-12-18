/**
 * Add background image when the screen size is over 576px and remove when not
 */
function change_background(size) {
  if (size.matches) {
    document.body.style.background =
      'url("../assets/images/star.webp") center center/cover';
  } else {
    document.body.style.background = "none";
  }
}

const size = window.matchMedia("(min-width: 576px)");

change_background(size);

size.addEventListener("change", function () {
  change_background(size);
});

//Set the sound button functionality

let audio_button = document.getElementsByClassName("sound");
let count = 0;
let audio = new Audio("../assets/audio/background_track.mp3");

/**
 * Play audio
 */
function play_audio() {
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
  count = 0;
}

audio_button[0].addEventListener("click", function () {
  count++;
  if (count <= 1) {
    play_audio();
    //Change the speaker icon
    audio_button[0].classList.remove("fa-volume-xmark");
    audio_button[0].classList.add("fa-volume-high");
  } else {
    stop_audio();
    //change the speaker icon
    audio_button[0].classList.remove("fa-volume-high");
    audio_button[0].classList.add("fa-volume-xmark");
  }
});

//Start button functionality

/**
 * redirect to the game.html page
 */
function to_game_page() {
  return (window.location.href = "../../game.html");
}

const start_button = document.getElementsByClassName("start-btn");
start_button[0].addEventListener("click", to_game_page, false);
