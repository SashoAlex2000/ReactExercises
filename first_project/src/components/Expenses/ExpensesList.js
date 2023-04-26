import React from "react";
import './ExpensesList.css';
import ExpenseItem from "./ExpenseItem";


const ExpensesList = (props) => {
    if (props.items.length === 0) {
        return <h2 className="expenses-list__fallback">
            No expenses for current year!
        </h2> 
    }

    return <ul className="expenses-list">
        {props.items.map(expense => <ExpenseItem
            // add a unique key, otherwise the rendering is unefficient 
            // and it could lead to bugs when rendering stateful componens
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
        />)}
    </ul>

}

export default ExpensesList;

