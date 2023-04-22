import React from "react";
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

    }

    return (
        <div className="new-expense">
            {/* the prop receives function pointer as value */}
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/> 
        </div>
    );
}

export default NewExpense;