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
