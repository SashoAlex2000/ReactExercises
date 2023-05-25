import classes from './Checkout.module.css';

const Checkout = props => {
    return <form>
        <div className={classes.control}>
            <label htmlFor='name'>Enter Youre Name</label>
            <input type="text" id="name"></input>
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input type="text" id="street"></input>
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal</label>
            <input type="text" id="postal"></input>
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>Postal</label>
            <input type="text" id="city"></input>
        </div>
        <button type='submit' onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
    </form>
}

export default Checkout;
