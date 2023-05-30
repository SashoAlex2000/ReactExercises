import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';
import { EVENTS_API_URL } from '../util/constants';

function EventForm({ method, event }) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const actionData = useActionData(); // access the data returned by the action (e.g. custom error)

    // check if the form is currently being submitted
    const isSubmitting = navigation.state === 'submitting'; 

    function cancelHandler() {
        navigate('..');
    }

    return (
        // 'Form' from React Router ommits the default behaviour and sends submitted form to 'actions'
        <Form method={method} className={classes.form}>
            {actionData && actionData.errors && <ul>
                {Object.values(actionData.errors).map(err=> <li key={err}>
                    {err}
                </li>)}
                </ul>}
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required
                    defaultValue={event ? event.title : ''} />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required
                    defaultValue={event ? event.image : ''} />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required
                    defaultValue={event ? event.date : ''} />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" required
                    defaultValue={event ? event.description : ''} />
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting your data' : 'Save'}
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

export async function action ({request, params}) {

    const method = request.method;

    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };

    let currUrl = EVENTS_API_URL;

    if (method==="PATCH") {
        const eventId = params.eventId;
        currUrl += `/${eventId}`;
    }

    const response = await fetch(currUrl, {
        method: method, // set the method dynamically for reusability
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
        return response;
    };

    if (!response.ok) {
        throw json({
            message: 'Data could not be saved '
        }, {
            status: 500,
        })
    };

    return redirect('/events');

}

