// /api/new-meetup
// the code runs on the server, not exposed to end users

import { MongoClient } from 'mongodb';
import { password } from '../../SECRET_KEY';

// req contains data about the received request
// res is used to send back a response
async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        
        const {
            title,
            image,
            address,
            description,
        } = data;

        const client = await MongoClient.connect(
            `mongodb+srv://SashoAlex2000:${password}@atlascluster.jmqqwk5.mongodb.net/meetups?retryWrites=true&w=majority`
        ); // this code should run on the client side 

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({
            message: 'Meetup inserted!'
        });

    }
}

export default handler;
