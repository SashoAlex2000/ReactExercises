import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const INITIAL_EXPENSES = [
  {
    id: 'e1',
    title: 'Trousers',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New Phone', amount: 499.99, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Headphones',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {

  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  const addExpenseHandler = (expense) => {
    // setExpenses([expense, ...expenses]); < -- not correct
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses];
    })
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses data={expenses}/>

    </div>
  );
}

export default App;
