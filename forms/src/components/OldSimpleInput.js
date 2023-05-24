import { useEffect, useRef, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import useInput from "../hooks/use-input";


function validateEmail (someEmail) {

  if (someEmail.trim() == '') {
    return false;
  }
  if (!someEmail.includes('@')) {
    return false;
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

  // const [enteredName, setEnteredName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [nameInputIsTouched, setNameInputIsTouched] = useState(false);

  // const [formIsValid, setFormIsValid] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);


  let formIsValid = false;  
  // const derivedEnteredNameIsValid = enteredName.trim() !== '';
  // const nameInputIsInvalid = !derivedEnteredNameIsValid && nameInputIsTouched;

  const derivedEnteredEmailIsValid = validateEmail(enteredEmail);
  const emailInputIsInvalid = !derivedEnteredEmailIsValid && emailInputIsTouched

  if (enteredNameIsValid && derivedEnteredEmailIsValid) {
    formIsValid = true;
  }

  // not necessary to use useEffect, just adds render cycles
  // useEffect(() => {
  //   if (enteredName) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [
  //   derivedEnteredNameIsValid
  // ]);

  // const nameInputChangeHandler = event => {
  //   setEnteredName(event.target.value);

  //   // if (event.target.value.trim() !== '') { // have to use event.target.value, 
  //   //   setEnteredNameIsValid(true);          // enteredName would be referring to old value
  //   // }

  // };

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  }


  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log(enteredName) // if there is some function which depeneds on the value 
  //   }                           // it isn't optimal to have true set as default for enteredNameIsValid
  // }, [

  // ]);

  // const nameInputBlurHandler = event => {
  //   setNameInputIsTouched(true);
  // }

  const emailInputBlurHandler = event => {
    setEmailInputIsTouched(true);
  }


  const formSubmissionHandler = event => {

    event.preventDefault();
    console.log('submitting!')

    // setNameInputIsTouched(true);

    if (nameInputHasError || !derivedEnteredEmailIsValid) {
      return;
    }
    resetNameInput();
    // setEnteredNameIsValid(true);
    // setEnteredName('');
    setEnteredEmail('');
    // setNameInputIsTouched(false);
    setEmailInputIsTouched(false);

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
