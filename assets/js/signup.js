// jshint esversion: 6

const signupBtn = document.getElementsByClassName("sign-up-btn")[0];
const backHomeBtn = document.getElementsByClassName("back-home")[0];
const signupPlace = document.getElementById("signup");
const confirmationPlace = document.getElementById("confirmation");

/**
 * Show Sign up page and hide different pages
 */
function showSignUpPage() {
  const signupFormHtml = `
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

  signupPlace.innerHTML = signupFormHtml;

  //hide game start page
  startPage.classList.add("start-hide");

  //Change the Sign up button to Home button
  signupBtn.classList.add("hide");
  backHomeBtn.classList.remove("hide");

  //show signup page after go back to home

  signupPlace.classList.remove("hide");

  //when clicked the submit button of the sign up form
  let submitForm = document.getElementById("signup-form");
  submitForm.addEventListener("submit", submit);
}

signupBtn.addEventListener("click", showSignUpPage);

/**
 * Go back to the home page from sign up page
 */
function go_home() {
  signupBtn.classList.remove("hide");
  backHomeBtn.classList.add("hide");
  signupPlace.classList.add("hide");
  startPage.classList.remove("start-hide");
}

backHomeBtn.addEventListener("click", go_home);

/**
 * When clicked a successful message will be displayed
 */
function submit(event) {
  event.preventDefault();

  const fName = document.getElementById("fname");
  const lName = document.getElementById("lname");

  let confirmationHtml = `
  <h2 class="success">Success</h2>
  <p class="message">Hello ${fName.value} ${lName.value} !! <br> 
     Thank you very much for registering with Brain Kids.<br>
     You will have access to upcoming games !!
  </p>
  `;

  confirmationPlace.innerHTML = confirmationHtml;

  signupPlace.classList.add("hide");
  confirmationPlace.classList.remove("hide");

  /**
   * Go back to the home page from successful message page
   */
  function goHomeSuc() {
    startPage.classList.remove("start-hide");
    confirmationPlace.classList.add("hide");
  }

  backHomeBtn.addEventListener("click", goHomeSuc);
}
