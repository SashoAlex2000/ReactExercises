import useInput from "../hooks/use-input-with-reducer";
import { validateEmail, validateNameInput } from "../utils/validators";


const BasicForm = (props) => {

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(validateNameInput);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(validateNameInput);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;
  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {

    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();

  }

  const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
          type='text' 
          id='name'
          name='first-name' 
          value={enteredFirstName} 
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          />
          {firstNameInputHasError && <p className="error-text ">Enter valid first name!</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
          type='text' 
          id='name' 
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && <p className="error-text ">Enter valid last name!</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
        type='text' 
        id='name' 
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        />
        {emailInputHasError && <p className="error-text ">Enter valid email!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
