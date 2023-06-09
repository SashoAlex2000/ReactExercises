
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import EventsPage, {loader as eventsDataLoader} from './pages/Events';
import EventDetail, {
    loader as eventDetailsDataLoader,
    action as deleteEventAction
} from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './components/Newsletter';

const router = createBrowserRouter([

    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'events',
                element: <EventsRootLayout />,
                children: [
                    {
                        index: true,
                        element: <EventsPage />,
                        loader: eventsDataLoader,
                    },
                    {
                        path: ':eventId',
                        id: 'event-detail',
                        loader: eventDetailsDataLoader, // nested routes for re-using a loader 
                        children: [
                            {
                                index: true,
                                element: <EventDetail/>,
                                action: deleteEventAction,
                            },
                            {
                                path: 'edit',
                                element: <EditEventPage />,
                                action: manipulateEventAction,
                            },
                        ]
                    },
                    {
                        path: 'new',
                        element: <NewEventPage />,
                        action: manipulateEventAction,
                    },
                    
                ],
            },
            {
                path: 'newsletter',
                element: <NewsletterPage />,
                action: newsletterAction,
            },

        ]
    },

])

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
