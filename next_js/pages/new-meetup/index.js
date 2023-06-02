import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";


function newMeetupPage() {

    const router = useRouter();

    async function addMeetupHandler (enteredData) {
        
        // send a request to our internal api
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/');

    };

    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
};

export default newMeetupPage;
