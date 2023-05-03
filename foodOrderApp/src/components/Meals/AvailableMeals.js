import React from "react";
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const STATIC_DUMMY_MEALS = [

    {
        id: 'm1',
        name: 'Banitsa',
        description: 'Perfect breakfast',
        price: 2.99,
    },
    {
        id: 'm2',
        name: 'Doner',
        description: 'Super healthy!!!',
        price: 6.5,
    },
    {
        id: 'm3',
        name: 'CheeseBurger',
        description: 'Super thick and juicy',
        price: 15.99,
    },
    {
        id: 'm4',
        name: 'Superfood Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },

];

const AvailableMeals = () => {

    const mealList = STATIC_DUMMY_MEALS.map(meal => <MealItem 
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />)

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;
