import React from "react";

// can be imported due to behind the scenes magic from the setup
// import is trnasformed to include the image 
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCardButton from "./HeaderCardButton";

const Header = props => {
    return <React.Fragment>

        <header className={classes.header}>
            <h1>Tasty Meals</h1>
            <HeaderCardButton>Cart</HeaderCardButton>
        </header>
        <div className={classes['main-image']}> 
            <img src={mealsImage} alt="food image"/>
        </div>
    </React.Fragment>
};

export default Header;
