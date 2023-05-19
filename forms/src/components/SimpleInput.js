import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {

  const [enteredName, setEnteredName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);

    // if (event.target.value.trim() !== '') { // have to use event.target.value, 
    //   setEnteredNameIsValid(true);          // enteredName would be referring to old value
    // }

  };

  const derivedEnteredNameIsValid = enteredName.trim() !== '';

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log(enteredName) // if there is some function which depeneds on the value 
  //   }                           // it isn't optimal to have true set as default for enteredNameIsValid
  // }, [

  // ]);

  const nameInputBlurHandler = event => {

    setNameInputIsTouched(true);

  }


  const formSubmissionHandler = event => {

    event.preventDefault();

    setNameInputIsTouched(true);

    if (!derivedEnteredNameIsValid) {
      return;
    }

    // setEnteredNameIsValid(true);
    setEnteredName('');
    setNameInputIsTouched(false);

  }

  const nameInputIsInvalid = !derivedEnteredNameIsValid && nameInputIsTouched;

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name cannot be empty!</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
