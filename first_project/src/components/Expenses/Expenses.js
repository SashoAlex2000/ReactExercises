
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFIlter";
import ExpenseItem from "./ExpenseItem"
import "./Expenses.css";
import React, { useState } from "react";
import ExpensesList from "./ExpensesList";


function Expenses(props) {

    const [filteredYear, setFilteredYear] = useState('2020');

    const changeFilteredYear = (year) => {
        setFilteredYear(year);
    }

    const filteredExpenses = props.data.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    

    return (
        <div>

            <Card className="expenses">
                <ExpensesFilter selectedYear={filteredYear} // Utilize two-way binding 
                    onFilterChange={changeFilteredYear} />

                <ExpensesList items={filteredExpenses}/>

            </Card>
        </div>)


}

export default Expenses;

