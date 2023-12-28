const signup_btn = document.getElementsByClassName("sign-up-btn")[0];
const back_hom_btn = document.getElementsByClassName("back-home")[0];
const signup_place = document.getElementById("signup");

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

  signup_place.innerHTML = signup_form_html;

  //hide game start page
  start_page.classList.add("start-hide");

  //Change the Sign up button to Home button
  signup_btn.classList.add("hide");
  back_hom_btn.classList.remove("hide");

  //show signup page after go back to home
  signup_place.classList.remove("hide");
}

signup_btn.addEventListener("click", show_signup_page);

/**
 * Go back to the home page
 */
function go_home() {
  signup_btn.classList.remove("hide");
  back_hom_btn.classList.add("hide");
  signup_place.classList.add("hide");
  start_page.classList.remove("start-hide");
}

back_hom_btn.addEventListener("click", go_home);
