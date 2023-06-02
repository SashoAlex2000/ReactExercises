import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { password } from "../SECRET_KEY";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'Drug party',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/25/4d/6c/main-room.jpg?w=1200&h=-1&s=1',
        address: 'Oborishte',
    },
    {
        id: 'm2',
        title: 'Drug party Again',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/25/4d/6c/main-room.jpg?w=1200&h=-1&s=1',
        address: 'Oborishte',
    },
]

function HomePage (props) {

    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // // 2 component render cycles, problem with SEO, page is empty initially
    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, [

    // ]);

    // return <MeetupList meetups={loadedMeetups} />
    return <MeetupList meetups={props.meetups} />

};

// reserved name, Nextjs finds it and executes it during the pre-render process
// before calling the JSX main function
// awaiting for Promise resolve is automatic
// executed duting the build process, not on the client
// data might change in DB and not be reflected in the front-end - revalidate
export async function getStaticProps() {
    
    //imports here will not be included in the client side bundle
    const client = await MongoClient.connect(
        `mongodb+srv://SashoAlex2000:${password}@atlascluster.jmqqwk5.mongodb.net/meetups?retryWrites=true&w=majority`
    ); // this code should run on the client side 

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(
                m => ({
                    title: m.title,
                    address: m.address,
                    image: m.image,
                    id: m._id.toString(),
                })
            ),
        },
        // incremental static generation
        revalidate: 10, // second, regenrated after 'x' seconds on the server
    }

}


// doesn't run during the build process, but always on the server after deployment
// runs for every incoming request
// export async function getServerSideProps (context) {

//     const req = context.req;
//     const res = context.res;

//     // fetch data

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     }

// }

export default HomePage;

