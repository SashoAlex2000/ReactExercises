import Card from './Card';
import { useCounter } from '../hooks/use-counter';
import { useState } from 'react';
import React from 'react';

const BackwardCounter = () => {


  const [direction, setDirection] = useState(false);
  const counter = useCounter(direction);

  const changeDirectionHandler = () => {
    setDirection(!direction);
  }

  return (
    <React.Fragment>
    <Card>{counter}</Card>
    <button onClick={changeDirectionHandler}>Switch direction</button>
    </React.Fragment>
  );
};

export default BackwardCounter;
