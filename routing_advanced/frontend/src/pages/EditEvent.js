import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";


function EditEventPage () {

    // const data = useLoaderData();
    const data = useRouteLoaderData('event-detail');

    return  <EventForm method="patch" event={data.event}>

    </EventForm>
}

export default EditEventPage;

