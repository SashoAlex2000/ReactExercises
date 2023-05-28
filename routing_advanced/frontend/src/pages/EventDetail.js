import { json, redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { EVENTS_API_URL } from "../util/constants";

function EventDetail () {

    const params = useParams();
    // const data = useLoaderData();
    // Since the loader was moved one level higher, it no longer worked with useLoaderData()
    // useRouteLoaderData has to be utilized with the appropriate id of the loader
    const data = useRouteLoaderData('event-detail');

    return  <EventItem event={data.event}/> 
}

export default EventDetail;

export async function loader ({request, params}) {
    
    //  request URL
    const id = params.eventId;

    const response = await fetch(EVENTS_API_URL + id);

    if (!response.ok) {
        throw json({
            message: 'Could not fetch the details' 
        }, {
            status: 500,
        })
    };

    return response;

};


export async function action ({params, request}) {

    const eventId = params.eventId;

    const response = await fetch(EVENTS_API_URL + eventId, {
        method: request.method,
    });

    if (!response.ok) {
        throw json({
            message: 'Could not delete this item' 
        }, {
            status: 500,
        })
    };

    return redirect('/events');


}

