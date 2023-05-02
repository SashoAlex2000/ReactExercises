import React, { useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const Home = (props) => {

  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      {/* if we have such a component, ctx is not the right thing,
      since it would mean we would have a Button boun to only logout,
      if we use ctx inside button */}
      <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
