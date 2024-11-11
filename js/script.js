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
const paymentOption = document.querySelector('select#payment');
const creditCard = document.querySelector('div#credit-card'); //cc section
const creditCardNumber = document.querySelector('input#cc-num');
const creditCardZip = document.querySelector('input#zip');
const creditCardCvv = document.querySelector('input#cvv');
const Paypal = document.querySelector('#paypal');
const Bitcoin = document.querySelector('#bitcoin');



console.log(creditCard)
/***********************************
* Loading Events 
***********************************/
name.focus()
let formValid = false;

/***********************************
* Job Role section 
***********************************/

//Show the 'other' text field if 'other' is selected
jobRoleOther.hidden = true;
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
//start with color option disabled
shirtColor.disabled = true;

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

//Extra Credit:  Add focus class to checkboxes when focus in on them.
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

// Start with 'Credit Card' as the payment option
for ( let i = 0; i < paymentOption.length; i++ ){
    if(paymentOption[i].value == 'credit-card'){
        paymentOption[i].selected = true;
    }
    paymentOptionTest('credit-card')
};

// If payment option is changed then show other options
paymentOption.addEventListener('change', (e)=> {
    paymentOptionTest(e.target.value)
});

// Only shows payment options appropriate to the selection
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
//Don't submit the form if it's the form is not valid
form.addEventListener('submit', (e)=> {
    if(formValid == false) {
        e.preventDefault();
    }
});

// setValidation {function} - sets or removes validation flags on fields
// element {argument} - the input field of the element to update
// isValid {argument} - false adds the flags, true removes them
//Test -- setValidation(name,false) --Test

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
* Regex Validation
***********************************/
// const name = document.querySelector('input#name');
// const email = document.querySelector('input#email');
// const creditCardNumber = document.querySelector('input#cc-num');
// const creditCardZip = document.querySelector('input#zip');
// const creditCardCvv = document.querySelector('input#cvv');