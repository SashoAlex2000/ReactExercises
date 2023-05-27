import classes from './Counter.module.css';
import { Component } from 'react'

// custom React hook made from the Redux team, select part of the managed state
// 'connect' function for class based components
import { useSelector, useDispatch, connect } from 'react-redux';
import { counterActions } from '../store';

const Counter = () => {

  // determine which keys to be extracted from the store;
  // automatically sets a subscription, 
  // every change in the (used) Redux store will update and re-execute component
  const counter = useSelector(state => state.counter.counter);
  const shouldShow = useSelector(state => state.counter.showCounter);

  // return a function, which is used to dispatch actions agains the Redux store;
  const dispatch = useDispatch();

  const incrementHandler = () => {
    // dispatch({
    //   type: 'INCREMENT',
    // })
    dispatch(counterActions.increment()); // increment() has to be executed to create the action object
  };

  const increaseByXHandler = () => {
    // dispatch({
    //   type: 'INCREASE_BY_X',
    //   amount: 5,
    // })

    dispatch(counterActions.increaseByX(5)); // { type: UNIQUE_IDENTIFIER, paylod: 5 }
  }

  const decrementtHandler = () => {
    // dispatch({
    //   type: 'DECREMENT',
    // })
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => { 
    // dispatch({
    //   type: 'TOGGLE_VISIBILITY',
    // })
    dispatch(counterActions.toggleCounter());
   };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {shouldShow && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseByXHandler}>Increment by 5</button>
        <button onClick={decrementtHandler}>Decreament</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

class ClassCounter extends Component {

  incrementHandler () {
    this.props.increment();
  }
  decrementtHandler () {
    this.props.decrement();
  }
  toggleCounterHandler () {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementtHandler.bind(this)}>Decreament</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }

};

// what part of the Redux store should be drilled in and passed to props for the Class
// equivalent to useSelector
const mapStateToProps = state => {
  return {
    counter: state.counter,
  }
};

// equivalent to useDispatch
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({
      type: 'INCREMENT',
    }),
    decrement: () => dispatch({
      type: 'DECREMENT',
    }),
  };
};

export default Counter;
// export default connect(mapStateToProps, mapDispatchToProps)(ClassCounter); // IIFE ??
