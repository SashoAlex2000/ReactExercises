import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";


function ErrorPage() {

    const error = useRouteError(); // enables us to get the data from an error

    let title = "There has been an error!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        message = error.data.message;
    };

    if (error.status === 404) {
        title = '404 - not found';
        message = 'Could not find this'
    };

    return <>
    <MainNavigation/>
    <PageContent title={title}>
        <p>{message}</p>
    </PageContent>
    </>
};

export default ErrorPage;
