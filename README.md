# c_interactive-form-v3_NAR
 
README

Overview: This details a few of the javascript processes used in the extra credit section of the script.js for the c_interactive-form-v3_NAR.

1. Conflicting Activity Times
	• Purpose: This code prevents users from selecting multiple activities scheduled for the same time.
	• How It Works:
	    • When an activity is selected, it checks the data-day-and-time attribute.
	    • If any other activity has the same day and time, it toggles the disabled state of that checkbox, disallowing the conflicting selection.

2. Real-Time Error Messages
	• Purpose: Validates each input as soon as the user leaves the input field.
	• How It Works:
        • The setValidation function is called on the blur event for each input field.
        • It uses regular expressions (regexName, regexEmail, etc.) to test if the input is valid.
        • If the input is invalid, it applies the appropriate validation error styling.

3. Conditional Error Message
	• Purpose: Provides customized error messages depending on the specific issue with the input.
	• How It Works:
        • For the name and email fields, different error messages are displayed based on the content of the input:
        • If the field is empty, a “cannot be blank” message appears.
        • If the format is incorrect (e.g., invalid characters for name), a specific message explains the required format.

    • Functions
        • setValidation(element, isValid)
	• Parameters:
        • element: The input element to validate.
        • isValid: A boolean indicating whether the input passes validation.
        • Purpose: Adds or removes error styling based on the validity of the input.
