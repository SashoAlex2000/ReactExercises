import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { password } from "../../SECRET_KEY";


function MeetupDetails (props) {
    console.log(props.meetupData);
    return <MeetupDetail 
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        />

};

export default MeetupDetails;

// useRouter to get ahold of URl cannot be used out of react component
// context parameter is used
export async function getStaticProps(context) {

    const meetUp = context.params.meetUp;
    console.log(meetUp);
    console.log("BAZINGA");

    const client = await MongoClient.connect(
        `mongodb+srv://SashoAlex2000:${password}@atlascluster.jmqqwk5.mongodb.net/meetups?retryWrites=true&w=majority`
    ); 

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const currentMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetUp) // converts the string to an appropriate ObjectId object?
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: currentMeetup.toString(),
                title: currentMeetup.title,
                image: currentMeetup.image,
                address: currentMeetup.address,
                description: currentMeetup.description,
            },
        }
    }

};

// used in case of dynamic ID's
export async function getStaticPaths() {

    const client = await MongoClient.connect(
        `mongodb+srv://SashoAlex2000:${password}@atlascluster.jmqqwk5.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({
        // all the objects
    }, {
        _id: 1, // only include the id's
    }).toArray();

    client.close();

    // describe the ID's for which the page should be pre-generated
    // 
    return {
        // fallback signifies whether ALL possible ID's are listed in 'paths'
        // if it is true, it will be dynamically generated
        fallback: false,
        paths: meetups.map(m => ({
            params: {
                meetUp: m._id.toString(),
            },
        }))
        // paths: [
        //     {
        //         params: {
        //             meetUp: 'm1',
        //         },
        //     },
        //     {
        //         params: {
        //             meetUp: 'm2',
        //         },
        //     },
        // ]
    }

};
