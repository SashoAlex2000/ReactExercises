import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const inputIsNotEmpty = (someInput) => someInput.trim() !== '';
const postalCodeIsCorrect = postalCode => postalCode.trim().length === 4;


const Checkout = props => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formsInputValidity, setFormsInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
    });

    const confirmHandler = (event) => {

        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsCorrect = inputIsNotEmpty(enteredName);
        const streetIsCorrect = inputIsNotEmpty(enteredStreet);
        const cityIsCorrect = inputIsNotEmpty(enteredCity);

        const postalIsCorrect = postalCodeIsCorrect(enteredPostal);

        setFormsInputValidity({
            name: nameIsCorrect,
            street: streetIsCorrect,
            city: cityIsCorrect,
            postal: postalIsCorrect,
        });

        const formIsValid = nameIsCorrect && streetIsCorrect && cityIsCorrect && postalIsCorrect;

        if (!formIsValid) {
            return;
        };

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity,
        })
        
    };

    const nameClasses = `${classes.control} ${formsInputValidity.name ? '' : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formsInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formsInputValidity.street && <p>Please enter a valid name!</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {!formsInputValidity.postal && <p>Please enter a valid name!</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formsInputValidity.city && <p>Please enter a valid name!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};


export default Checkout;
