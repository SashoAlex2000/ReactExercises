import React, { useState } from "react";
import './ExpenseForm.css';

const ExpenseForm = () => {

    // the way with multiple states
    const [enterdTitle, setEnteredTitle] = useState('');
    // multiple states are completely separate
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    // one state
    // const [userInput, setUserInput] = useState({
    //    enterdTitle: '',
    //    enteredAmount: '',
    //    enteredDate: '', 
    // });

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        // setUserInput({
        //     ...userInput, // to ensure that the other kvp's dont ket lost
        //     enterdTitle: event.target.value,
        // });

        // setUserInput((prevState) => { // the safer way to ensure that the state you depend on is not corrupted
        //     return {
        //         ...prevState,
        //         enterdTitle: event.target.value
        //     }
        // })
    }

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enterdTitle,
            amount: enteredAmount,
            date: new Date(enteredDate),
        }

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" onChange={titleChangeHandler} value={enterdTitle} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input 
                    value={enteredAmount} // two way binding, feed the state back into the input
                    type="number" onChange={amountChangeHandler}
                    min='0.01' step='0.01'
                    />
                </div>

                <div className="new-expense__control">
                    <label>Date</label>
                    <input 
                    type="date" 
                    min="2019-01-01" 
                    max="2022-12-31" 
                    onChange={dateChangeHandler} 
                    value={enteredDate}
                    />
                </div>

            </div>
            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;