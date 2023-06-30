import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";


const HomePage = () => {

    const currUser = localStorage.getItem('currentUserId');

    const [currentItems, setCurrentItems] = useState(null);
    const [itemsFetched, setItemsFetched] = useState(false);

    const [itemName, setItemName] = useState('');

    const userSignOutHandler = () => {

        signOut(auth).then(() => {
            console.log('the user has been signed out');
            localStorage.removeItem('currentUserId');
        })

    };

    const fetchCurrentUserItemsHandler = async () => {

        const currUser = localStorage.getItem('currentUserId');

        if (currUser) {

            const response = await fetch(
                'https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app/testItems.json'
            );

            const responseData = await response.json();

            console.log(responseData);

            if (responseData && currUser in responseData) {
                setCurrentItems(prevItems => responseData[`${currUser}`]);
                console.log(currentItems);
            };
            setItemsFetched(true);

        };

    };

    const addItemHandler = async (event) => {

        event.preventDefault();

        if (itemName.trim() !== '') {

            // const newId = `i${currentItems.length + 1}`;
            const newId = `i${Object.keys(currentItems).length + 1}`;

            const newItem = {};
            newItem[newId] = itemName;

            console.log(newItem);

            const itemsToSend = { ...currentItems, ...newItem };

            console.log(itemsToSend);

            await fetch(`https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app/testItems/${currUser}.json`, {
                method: 'PUT',
                body: JSON.stringify(itemsToSend)
            })

        };

    };

    const addItemForm = <form onSubmit={addItemHandler}>
        <input type="text" placeholder="Enter Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)}></input>
        <button type="submit">Add Item</button>
    </form>

    return <>
        <h1>
            Current user: {currUser ? currUser : 'no current user'}
        </h1>
        {currUser && <button onClick={userSignOutHandler}>SignOut</button>}
        {currUser && <button onClick={fetchCurrentUserItemsHandler}>Fetch Your Items</button>}
        {currentItems && Object.entries(currentItems).map(([key, value]) => <li key={key}>{key} {value}</li>)}
        <br></br>
        {!currentItems && itemsFetched && 'you have no items!'}
        <br></br>
        {currUser && addItemForm}
    </>
};

export default HomePage;

