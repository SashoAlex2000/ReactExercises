import Card from './Card';
import { useCounter } from '../hooks/use-counter';

const ForwardCounter = () => {

  // every component has its own state from the hook
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
