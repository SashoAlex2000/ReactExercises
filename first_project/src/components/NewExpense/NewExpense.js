import React, { useState } from "react";
import './NewExpense.css';

import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString(),
        }

        // when this function is called one level below, we pass in the modified data to 
        // the function injected from one level above
        props.onAddExpense(expenseData);

        setShouldShowForm(false);

    } 

    const [shouldShowForm, setShouldShowForm] = useState(false);

    const showFormHandler = (event) => {
        setShouldShowForm(true);
    }

    const hideFormHander = (event) => {
        setShouldShowForm(false);
    }


    const ADD_NEW_EXPENSE_BUTTON = <button type="button" onClick={showFormHandler}>Add Expense</button>

    return (
        <div className="new-expense">
            {/* the prop receives function pointer as value */}
            {/* <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} /> */}

            {!shouldShowForm && ADD_NEW_EXPENSE_BUTTON}
            {shouldShowForm && 
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}
            onCancelClick={hideFormHander} 
            />}

        </div>
    );
}

export default NewExpense;