import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UsersList';


function App() {

  const [usersList, setUsersList] = useState([]);

  const userAddHandler = (userName, userAge) => {
    setUsersList((oldUserList) => {
      return [...oldUserList, {
        name: userName,
        age: userAge,
        key: Math.random().toString(),
      }];
    })
  } 

  return (
    // A provided wrapper from React, to avoid <div> soup
    <React.Fragment>
      <AddUser onAddUser={userAddHandler}/>
      <UserList users={usersList}/>
    </React.Fragment>
  );
}

export default App;
