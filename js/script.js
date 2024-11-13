/***********************************
* BASIC FORM ELEMENT REFERENCES 
***********************************/
const form = document.querySelector('form')

const name = document.querySelector('input#name');
const email = document.querySelector('input#email');

const jobRoleSelect = document.querySelector('select#title');
const jobRoleOther = document.querySelector('input#other-job-role');

const shirtSize = document.querySelector('select#size');
    const shirtDesign = document.querySelector('select#design');
    const shirtColor = document.querySelector('select#color');

const activities = document.querySelector('fieldset#activities');
    const activitiesCheckbox = document.querySelectorAll('input[type=checkbox]');
    const totalCostElement = document.querySelector('p#activities-cost');
    const activitiesHint = document.querySelector('p#activities-hint');
    

const paymentOption = document.querySelector('select#payment');
    const creditCard = document.querySelector('div#credit-card'); //cc section
        const creditCardNumber = document.querySelector('input#cc-num');
        const creditCardZip = document.querySelector('input#zip');
        const creditCardCvv = document.querySelector('input#cvv');
    const paypal = document.querySelector('#paypal');
    const bitcoin = document.querySelector('#bitcoin');

const regexName = /^[a-z]+$/i;
const regexEmail = /^[\w._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i;

const regexCreditCardNumber = /^\d{13,16}$/;
const regexCreditCardZip = /^\d{5}(-\d{4})?$/;
const regexCreditCardCvv = /^\d{3}$/;




/***********************************
* Loading Events 
***********************************/

name.focus() //start with focus on name input
jobRoleOther.hidden = true; // start with job roles hidden
shirtColor.disabled = true; // start with shirt colors disabled until design picked

//set starting payment option to 'credit-card'
for ( let i = 0; i < paymentOption.length; i++ ){
    if(paymentOption[i].value == 'credit-card'){
        paymentOption[i].selected = true;
    }
};
paymentOptionTest('credit-card'); //hide other payment options choices

/***********************************
* Job Role section 
***********************************/

//Show the 'other' text field if 'other' is selected
jobRoleSelect.addEventListener('change', (e)=> {
    if(jobRoleSelect.value == 'other') {
        jobRoleOther.hidden = false;
    } else {
        jobRoleOther.hidden = true;
    }
});

/***********************************
* T-shirt section 
***********************************/

//If design input is picked, reveal color input, disable unavailable colors options
shirtDesign.addEventListener('change', (e)=> {
    shirtDesignPick = e.target.value;
    shirtColor.disabled = false;

    for ( let i = 0; i < shirtColor.length; i++ ){
        //Reset previous selected color to none.
        shirtColor[i].selected = false;

        //Only show available colors that match the theme
        if(shirtDesignPick == shirtColor[i].dataset.theme) {
            shirtColor[i].disabled = false;
        } else {
            shirtColor[i].disabled = true;
        }
    }

    //Extra: If design picked/changed, then prompt to pick a color instead of a design.
    shirtColor[0].textContent = 'Pick A Color';
    shirtColor[0].selected = true;
});

/***********************************
* Register for Activities Section 
***********************************/

//Add up the cost of the activities
let totalCost = 0;

activities.addEventListener('change', (e)=> {
    if(e.target.checked == true) {
        totalCost += +e.target.dataset.cost;
    } else if (e.target.checked == false) {
        totalCost -= +e.target.dataset.cost
    }
    totalCostElement.innerHTML = 'Total: $' + totalCost
});

//Add focus class to checkboxes when focus in on them.
activitiesCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });

    checkbox.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
});

/***********************************
* Payment Info Section
***********************************/

// If payment option is changed then show other options
paymentOption.addEventListener('change', (e)=> {
    paymentOptionTest(e.target.value)
});

/**
 * @function paymentOptionTest
 * @description - adds/removes hiddent attribute based on paymentType argument
 * @param {string} paymentType  - a select field of payment options
 */
function paymentOptionTest(paymentType){
    if(paymentType == 'credit-card'){
        paypal.hidden = true;
        bitcoin.hidden = true;
        creditCard.hidden = false;
    } else if (paymentType == 'paypal'){
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    }  else if (paymentType == 'bitcoin'){
        paypal.hidden = true;
        bitcoin.hidden = false;
        creditCard.hidden = true;
    }
};

/***********************************
* Visual Validation Errors
***********************************/

//Form Submission
form.addEventListener('submit', (e)=> {

    //validate text inputs with regex variables
    const isValidName = regexName.test(name.value);
    const isValidEmail = regexEmail.test(email.value);
    const isValidCreditCardNumber = regexCreditCardNumber.test(creditCardNumber.value);
    const isValidCreditCardZip = regexCreditCardZip.test(creditCardZip.value);
    const isValidCreditCardCvv = regexCreditCardCvv.test(creditCardCvv.value);
    let isValidActivitiesCheckbox = false;

    //Run setValidation function based on true/false validation test for these inputs on submit
    setValidation(name,isValidName) 
    setValidation(email,isValidEmail)

    
    //Activities Validation: At least one checkbox must be selected to proceed.  
    //Note: The structure of the html won't allow me to use the setValidation function. So i've set everything separately.
    for(let i = 0; i < activitiesCheckbox.length; i++) {
        if(activitiesCheckbox[i].checked) {
            isValidActivitiesCheckbox = true;
            break;
        }
    }
    if (isValidActivitiesCheckbox) {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activitiesHint.style.display = 'none';
    } else {
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activitiesHint.style.display = 'block';
    }

    //If credit card is selected payment option, validate the cc inputs.  Skip if not.
    //allCCValid validates credit card inputs as a group.  Start with allCCValid as true so if other non-cc options are picked it will validate
    let allCCValid = true;

    if(paymentOption.value == 'credit-card'){
        setValidation(creditCardNumber,isValidCreditCardNumber)
        setValidation(creditCardZip,isValidCreditCardZip)
        setValidation(creditCardCvv,isValidCreditCardCvv)
        allCCValid = (isValidCreditCardNumber && isValidCreditCardZip && isValidCreditCardCvv)
    };

    //All inputs must be valid (true) submit the form, otherwise, if any are invalid (false) preventDefault() and stop the form from submitting
    if (!isValidName || !isValidEmail || !allCCValid || !isValidActivitiesCheckbox) {
        e.preventDefault();
    };
});


/**
 * @function setValidation
 * @description - sets or removes validation classes on input elements
 * @param {string} element  - input element to add class
 * @param {string} isValid  - true/false arugment results from Regex test() above
 */ 

function setValidation(element,isValid){
    if(isValid == false){
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.nextElementSibling.style.display = 'block';
    } else if(isValid == true){
        element.parentElement.classList.remove('not-valid');
        element.parentElement.classList.add('valid');
        element.nextElementSibling.style.display = 'none';
    }
}


/***********************************
* Extra Credit
***********************************/

//Conflicting Activity Times
activities.addEventListener('change', (e)=> { 
    const selectedDayTime = e.target.dataset.dayAndTime;

    //loop through each checkbox and if the selectedDayTime is the same and the name is different, disable it or if it's already disabled remove disabled using toggle
    activitiesCheckbox.forEach((checkbox) => {
        const testedCheckbox = checkbox.dataset.dayAndTime;

        if( testedCheckbox == selectedDayTime && checkbox.name !== e.target.name) {
            checkbox.parentElement.classList.toggle('disabled');
            checkbox.disabled = !checkbox.disabled; //if checkbox.disabled is true, set to false and vice versa similar to the toggle above
        }
    });
});

//Real-Time Error Messages
// On input blur, call setValidation func which will mark as valid or invalid upon moving to a new field. Argument 1: The html element to set.  Argument 2: Test the input against the regex validation to return and pass in a "true | false" argument.
name.addEventListener('blur', (e)=> {
    setValidation(name,regexName.test(name.value));
});

email.addEventListener('blur', (e)=> {
    setValidation(email,regexEmail.test(email.value))
});

creditCardNumber.addEventListener('blur', (e)=> {
    setValidation(creditCardNumber,regexCreditCardNumber.test(creditCardNumber.value))
});

creditCardZip.addEventListener('blur', (e)=> {
    setValidation(creditCardZip,regexCreditCardZip.test(creditCardZip.value))
});

creditCardCvv.addEventListener('blur', (e)=> {
    setValidation(creditCardCvv,regexCreditCardCvv.test(creditCardCvv.value))
});


//Conditional Error Message
//Update hint to provide more detailed validation message.
//Note: initially I combined this with the above 'Real-Time Error Messages' section but decided to separate it for evaluation purposes so it could be seen more easily.


name.addEventListener('blur', (e) => {
    if (regexName.test(name.value)) {
        // Clear the message if the input is valid
        name.nextElementSibling.textContent = '';
    } else if (name.value === "") {
        // Show specific message if the name is blank
        name.nextElementSibling.textContent = 'Name field cannot be blank';
    } else {
        // Show specific message if the name has invalid characters
        name.nextElementSibling.textContent = 'Name field can only contain letters';
    }
});

email.addEventListener('blur', (e) => {
    if (regexEmail.test(email.value)) {
        // Clear the message if the input is valid
        email.nextElementSibling.textContent = '';
    } else if (email.value === "") {
        // Show specific message if the email is blank
        email.nextElementSibling.textContent = 'Email field cannot be blank';
    } else {
        // Show specific message if the email format is invalid
        email.nextElementSibling.textContent = 'This is not a valid email. Must be similar to email@provider.com';
    }
});