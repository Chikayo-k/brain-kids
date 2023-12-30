const signupBtn = document.getElementsByClassName("sign-up-btn")[0];
const back_hom_btn = document.getElementsByClassName("back-home")[0];
const signup_place = document.getElementById("signup");
const confirmation_place = document.getElementById("confirmation");

/**
 * Show  Sign up page and hide different pages
 */
function show_signup_page() {
  const signup_form_html = `
<h2 class="signup-title">Sign Up</h2>
<p class="signup-p">Thank you very much for visiting Brain Kids.<br>
    Sign up with us, to gain access to upcoming games.
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
  startPage.classList.add("start-hide");

  //Change the Sign up button to Home button
  signupBtn.classList.add("hide");
  back_hom_btn.classList.remove("hide");

  //show signup page after go back to home

  signup_place.classList.remove("hide");

  //when clicked the submit button of the sign up form
  let submit_form = document.getElementById("signup-form");
  submit_form.addEventListener("submit", submit);
}

signupBtn.addEventListener("click", show_signup_page);

/**
 * Go back to the home page from sign up page
 */
function go_home() {
  signupBtn.classList.remove("hide");
  back_hom_btn.classList.add("hide");
  signup_place.classList.add("hide");
  startPage.classList.remove("start-hide");
}

back_hom_btn.addEventListener("click", go_home);

/**
 * When clicked a successful message will be displayed
 */
function submit(event) {
  event.preventDefault();

  const fName = document.getElementById("fname");
  const lName = document.getElementById("lname");

  let confirmation_html = `
  <h2 class="success">Success</h2>
  <p class="message">Hello ${fName.value} ${lName.value} !! <br> 
     Thank you very much for registering with Brain Kids.<br>
     You will have access to upcoming games !!
  </p>
  `;

  confirmation_place.innerHTML = confirmation_html;

  signup_place.classList.add("hide");
  confirmation_place.classList.remove("hide");

  /**
   * Go back to the home page from successful message page
   */
  function goHomeSuc() {
    startPage.classList.remove("start-hide");
    confirmation_place.classList.add("hide");
  }

  back_hom_btn.addEventListener("click", goHomeSuc);
}
