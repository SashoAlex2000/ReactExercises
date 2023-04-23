import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate';
import Card from "../UI/Card";

import React, { useState } from 'react';

// props are key-value pairs
function ExpenseItem (props) {

    // react hook - changes in the variable will call the component function again
    // returns an array - value and updating function;
    // will not re-initialize the state
    // const [title, setTitle] = useState(props.title);
    // const expenseAmount = props.amount;

    // const clickButton = () => {
    //     setTitle('Updated!');
    // }

    return (
    <li>
        <Card className='expense-item'>
            <ExpenseDate date={props.date} />
            <div className='expense-item__description'>
                <h2>{props.title}</h2>
                <div className='expense-item__price'>${props.amount}</div>
            </div>
            {/* pass just a pointer to the function, otherwise it will be executed when the code is parsed */}
            {/* <button onClick={clickButton}>Clicker</button> */}
        </Card>
    </li>);
}

export default ExpenseItem;