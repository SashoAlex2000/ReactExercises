import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

// created outside of the componenct function, since we won't need any data from it
// manage email state in one place 
const emailReducer = (state, action) => { // last state snapshot and the received function
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.includes('@'),
        };
    }

    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.includes('@'),
        }
    }

    return {
        value: '',
        isValid: false,
    };
};

const passwordReducer = (state, action) => {

    if (action.type === 'PASS_INPUT') {
        return {
            value: action.val,
            isValid: action.val.trim().length > 6,
        };
    };

    if (action.type === 'PASSWORD_BLUR') {
        return {
            value: state.value,
            isValid: state.value.trim().length > 6,
        }
    };

    return {
        value: '',
        isValid: false,
    };

}


const Login = (props) => {
    //   const [enteredEmail, setEnteredEmail] = useState('');
    //   const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: undefined, // so that it isn't blurred initially
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: undefined,
    });

    const authCtx = useContext(AuthContext);

    // PUT ONLY THE VALIDITY to be checked from the state 
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('running');
            setFormIsValid(
                emailIsValid && passwordIsValid
            )
        }, 500)
            ;
        return () => {
            clearTimeout(timer);
        }
    }, [setFormIsValid,
        // emailState,
        // passwordState,
        emailIsValid, // renders the effect only when the validiy changes (tru <-> false)
        passwordIsValid,
    ]);

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value,
        });
        // NOT optimal to set the validity of form from here, could mess up state sequence
        // setFormIsValid(
        //     event.target.value.includes('@') && passwordState.isValid
        // );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'PASS_INPUT',
            val: event.target.value,
        })
        // setFormIsValid(
        //     emailState.isValid && event.target.value.trim().length > 6
        // )
    };

    const validateEmailHandler = () => {
        dispatchEmail({
            type: 'INPUT_BLUR',
        })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({
            type: 'PASSWORD_BLUR',
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        authCtx.onLogin(emailState.value, passwordState.value);
    };
    

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                
                <Input 
                id="email" 
                label="E-mail" 
                type="email" 
                isValid={emailIsValid}
                value={emailState.value} 
                onChange={emailChangeHandler} 
                onBlur={validateEmailHandler}
                >
                </Input>
                <Input 
                id="password" 
                label="P455" 
                type="password" 
                isValid={passwordIsValid}
                value={passwordState.value} 
                onChange={passwordChangeHandler} 
                onBlur={validatePasswordHandler}
                >
                </Input>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;