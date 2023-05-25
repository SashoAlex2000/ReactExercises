import React, { useEffect, useState } from "react";
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

    const [meals, setMeals] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(undefined);

    useEffect(() => {
        const getTheMeals = async () => {

            setIsLoading(true);

            const response = await fetch(
                'https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            };

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }

            setMeals(loadedMeals);

            setIsLoading(false);

        };

        // cannot use try catch, since we need to await in it,
        // and there will be need for illegal async function - getTheMeals return a promise
        // it rejects the promise
        getTheMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

        

    }, [

    ])

    if (isLoading) {
        return <section className={classes.MealIsLoading}>
            <p>Loading...</p>
        </section>
    };

    if (httpError) {
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    };

    const mealList = meals.map(meal => <MealItem
        id={meal.id}
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
