// display a message based on input
let showMessage = (input, message, type) => {
	// fetch small element and set message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

// display error message
let showError = (input, message) => {
	return showMessage(input, message, false);
}

// display success message
let showSuccess = (input) => {
	return showMessage(input, "", true);
}

// check if any value is entered in the input field and display message accordingly 
let hasValue = (input, message) => {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

// validate email address
let validateEmail = (input, requiredMsg, invalidMsg) => {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

// validat telephone number
let validateTel = (input, requiredMsg, invalidMsg) => {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate telephone number format
	const telRegex = /^\(?([0-9]{3})\)?[-.""]?([0-9]{4})$/;
	
	const tel = input.value.trim();
	if (!telRegex.test(tel)) {
		return showError(input, invalidMsg);
	}
	return true;
}

// validate password
let validatePw = (input, requiredMsg, invalidMsg) => {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate password format
	const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	
	const pw = input.value.trim();
	if (!pwRegex.test(pw)) {
		return showError(input, invalidMsg);
	}
	return true;
}

// get the form
const form = document.querySelector("#register");

// display the appropriate message for the case
const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format: example@example.com";
const TELEPHONE_REQUIRED = "Please enter your phone number"
const TELEPHONE_INVALID = "Please enter a correct telephone number format: \n 123-4567"
const PASSWORD_REQUIRED = "Please create a password"
const PASSWORD_INVALID = "Password must have at least: \n 8 characters \n 1 uppcase & 1 lowercase letter \n 1 number"

form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
	let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
	let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
	let telValid = validateTel(form.elements["tel"], TELEPHONE_REQUIRED, TELEPHONE_INVALID);
	let pwValid = validatePw(form.elements["pw"], PASSWORD_REQUIRED, PASSWORD_INVALID);
	// if valid, submit the form and display success message
	if (nameValid && emailValid && telValid && pwValid) {
		form.innerHTML = `
		<h1>Thank you for registering!</h1>
		`;
	}
});