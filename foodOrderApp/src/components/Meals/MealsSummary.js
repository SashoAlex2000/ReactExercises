import React from "react";

import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return <section className={classes.summary}>
    <h2>
        Delicious, totally real food!
    </h2>
    <p>
        Choose favourite meal from our selection
    </p>
    <p>
        Order as many as you want.
    </p>
  </section>
}

export default MealsSummary;
