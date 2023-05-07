import React, { useRef, useState } from "react";
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";


const MealItemForm = props => {

  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountOfInputRef = useRef();
  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountOfInputRef.current.value;
    const numberEnteredAmount = +enteredAmount;
    
    if (enteredAmount.trim().length === 0 || numberEnteredAmount < 1 || numberEnteredAmount > 5) {
        setAmountIsValid(false);
        return;
    }

    props.onAddToCart(numberEnteredAmount);

  }

  return <form className={classes.form} onSubmit={submitHandler}>
    <Input
      ref={amountOfInputRef}
      label="Amount"
      input={{
        id: 'amount' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1',
      }} />
    <button>Add</button>
    {!amountIsValid && <p>Please enter a valid amout!</p>}
  </form>
}

export default MealItemForm;
