import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";
import { EVENTS_API_URL } from "../util/constants";

function NewEventPage () {
    return  <EventForm>

    </EventForm>
}

export default NewEventPage;

export async function action ({request, params}) {

    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }

    const response = await fetch(EVENTS_API_URL, {
        method: 'POST',
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
