const signup_btn = document.getElementById("sign-up-btn");

/**
 * Show  Sign up page and hide different pages
 */
function show_signup_page() {
  const signup_form_html = `
<h2 class="signup-title">Sign Up</h2>
<p class="signup-p">Thank you very much for visiting Brain Kids.<br>
    Sign up with us, to gain access to our wide range of available games.
</p>
<form id="signup-form">
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname" required>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" autocomplete="off" required>
    <input id="submit" class="btn" type="submit" value="Submit">
</form>
`;

  const signup_place = document.getElementById("signup");
  signup_place.innerHTML = signup_form_html;

  //hide game start, game, game over card
  let score_board_page = document.getElementById("score-board");
  score_board_page.remove();
  start_page.classList.add("start-hide");
  game_page.classList.add("game-hide");
  game_over_page.classList.add("game-over-hide");

  //Change the Sign up button to Home button
  const signup_btn_tex = document.getElementsByClassName("sign-up-btn")[0];
  signup_btn_tex.textContent = "Home";
}

signup_btn.addEventListener("click", show_signup_page);
