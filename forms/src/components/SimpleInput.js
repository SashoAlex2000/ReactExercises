import { useEffect, useRef, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import useInput from "../hooks/use-input";


function validateEmail (someEmail) {

  if (someEmail.trim() == '') {
    return false;
  }
  if (!someEmail.includes('@')) {
    return false;
  } else {
    if (someEmail.length === 1) {
      return false;
    }
    
    const shredded = someEmail.split('@');
    if (shredded.length !== 2) {
      return false;
    }
    
    if (!shredded[1].includes('.')) {
      return false;
    }

  }

  return true;

}


const SimpleInput = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: derivedEnteredEmailIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;
  if (enteredNameIsValid && derivedEnteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {

    event.preventDefault();
    console.log('submitting!')

    if (nameInputHasError || !derivedEnteredEmailIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();

  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name cannot be empty!</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Name</label>
        <input
          type='text'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && <p className="error-text">Email cannot be empty and has to contain '@"!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
