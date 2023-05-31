import { Form, useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {

    // send request behind the scenes, w/o triggering route changes
    const fetcher = useFetcher();
    const { data, state } =  fetcher;

    useEffect(() => {
        if (state == 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [
        state,
        data
    ]);

    return (
        // Form automatically triggers the action to the currently active Route
        // fetcher.Form triggers action/loader w/o mavigating to the page loader/action belong 
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;