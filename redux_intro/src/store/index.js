import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

// the convention is to store Redux in a index.js in store folder 

const initialCounterState = { 
    counter: 0, 
    showCounter: true ,
};

// prepare a slice of the global state; 
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: { // map of all the reducers this slide needs
        increment (state) {
            // in these methods, mutating the state is allowed - because redux/toolkit takes care of it
            state.counter++;
        },
        decrement (state) {
            state.counter--;
        },
        increaseByX (state, action) { // action is still received as data, if needed for the funct
            state.counter = state.counter + action.payload;
        },
        toggleCounter (state) {
            state.showCounter = !state.showCounter;
        },
    }
});


const initialAuthState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login (state) {
            state.isAuthenticated = true;
        },
        logout (state) {
            state.isAuthenticated = false
        }
    }
});

const countReducer = (state=initialCounterState, action) => {

    // never mutate existing state -> bugs and unpredictable behaviour
    if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter,
        };
    };
    if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter,
        };
    };
    if (action.type === 'INCREASE_BY_X') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter,
        };
    };

    // objects returned DO NOT merge with existing state, they override it;
    if (action.type === 'TOGGLE_VISIBILITY') {
        return {
            counter: state.counter,
            showCounter: !state.showCounter,
        };
    };
    
    return state;

}

// OLD way of creating store, without Redux Toolkit
// NOT depracated
// only ONE store per app
// let store = createStore(countReducer); 

// WITH Redux Toolkit 

// Hard to be done with multiple slices, combineReducers can be utilized
// let store = createStore(counterSlice.reducer); 

// creates a store, but enables merging of multiple slices 
let store = configureStore({ // configuration object
    // value of reducer could be one reducer OR an object of reducers - a map
    // reducer: {
    //     counter: counterSlice.reducer,
    // } // not used here, because there is only one reducer

    // reducer: counterSlice.reducer

    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
    }

});

// counterSlice.actions holds the different actions, and calling
// counterSlice.actions.decrement for example creates an action object with appropriate unique ID
// these methods are called 'action creators' and there is one for each defined function in the reducers
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
