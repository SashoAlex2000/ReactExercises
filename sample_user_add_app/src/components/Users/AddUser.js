import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {

    // Refs are better when reading values - they are less code, but in edge cases DOM has to be manipulated 
    // State is more code cleaner, more code
    // Refs create uncontrolled components, meaning they are not controlled with React
    // State creates controlled components

    // when it renders, it stores {current: Actual DOM node}
    const nameInputRef = useRef();
    const ageInputRef = useRef(); 

    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const refEnteredName = nameInputRef.current.value;
        const refEnteredAge = ageInputRef.current.value;

        if (refEnteredName.trim().length === 0 || refEnteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input!',
                message: 'Non-empty values only'
            });
            return;
        }

        // the plus forces a conversion to type Number
        if (+refEnteredAge < 16) {
            setError({
                title: 'Invalid age!',
                message: 'Age must be at least 16'
            });
            return;
        }

        props.onAddUser(refEnteredName, refEnteredAge);
        // USUALLY a bad practice to manipulate DOM directly, w/o React,
        // but it is acceptable in this case
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';


        // setEnteredAge('');
        // setEnteredUsername('');

    }

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value);
    // }

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // }
    
    const errorRemoveHandler = (event) => {
        setError(null); // set it to a falsy value;
    }
    
    // also, a wrapping div isn't the only way - an array of JSX elements could be returned (with keys)
    // with divs we can have 'dvi soup' 
    // or use Wrapper - an empty component - doesn't rendering anything - one returned element
    return (
    <Wrapper>
        {/* rendered when error is 'truthy', eg an object */}
        {error && <ErrorModal 
        title={error.title} 
        message={error.message} 
        onConfirm={errorRemoveHandler}
        />}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}> 
                {/* for is reserved JS word, we have to use htmlFor */}
                <label htmlFor="username">Username</label> 
                <input 
                id="username" 
                type="text" 
                // onChange={usernameChangeHandler} 
                // value={enteredUsername}

                // puts this DOM element in the ref value 
                ref={nameInputRef}></input>

                <label htmlFor="age">Age</label> 
                <input 
                id="age" 
                type="number" 
                // onChange={ageChangeHandler} 
                // value={enteredAge} 
                ref={ageInputRef}></input>

                <Button type="submit">Add new user</Button>

            </form>
        </Card>
    </Wrapper>
    
    )

};

export default AddUser;
