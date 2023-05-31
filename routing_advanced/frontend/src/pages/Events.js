import { Suspense, useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';


function EventsPage() {

    // event though technically loader returns a Promise, Router makes sure data is received
    // const data = useLoaderData(); // access closest loader data

    const { events } = useLoaderData();

    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }

    // const listOfEvents = data.events

    // return (
    //     <EventsList events={listOfEvents}/>
    // );

    // show a fallback while waiting for something 
    return <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
            {(loadedEvents) => 
                <EventsList events={loadedEvents}>
                </EventsList>
            }
        </Await>
    </Suspense>
}

export default EventsPage;

// the best structure pattern is for the loader to be in the component file,
// and imported and used in the router
async function loadEvents() {
    // the function is executed on each visit to this URL BEFORE the JSX code is rendered
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {
        //     isError: true,
        //     message: 'Fetching data obstructed',
        // };

        // when there is an error in the loader, React will render the closest ErrorElement
        // throw new Response(JSON.stringify({
        //     message: "Could not fetch the resources!"
        // }), {
        //     status: 500,
        // } )

        throw json(
            {
                message: "Could not fetch the resources!",
            },
            {
                status: 500,
            }
        )

    } else {
        // const resData = await response.json();

        // // Router takes any return data from loader and passes it to the Component
        // return resData.events;

        // response can be directly returned, since useLoaderData is able to resolve Responses
        // return response;

        // Responses are no longer automatically resolved
        const responseData = await response.json();
        return responseData.events;

    }
};

export function loader() {

    return defer({
        events: loadEvents(), // list http requests, store the promise in the events key
    });

}
