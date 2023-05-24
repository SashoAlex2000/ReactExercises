import { useReducer } from "react";

const defaultState = {
    enteredValue: '',
    isTouched: false,
}

const stateReducer = (state, action) => {

    if (action.type === 'INPUT_CHANGE') {
        return {
            enteredValue: action.value,
            isTouched: state.isTouched,
        }
    }

    if (action.type === 'INPUT_BLUR') {
        return {
            enteredValue: state.enteredValue,
            isTouched: true,
        }
    }

    if (action.type === 'RESET') {
        return defaultState;
    }

    return defaultState;

}

const useInput = (validateValue) => {

    const [inputState, dispatch] = useReducer(stateReducer, defaultState);


    const valueIsValid = validateValue(inputState.enteredValue);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: event.target.value,
        })
    };

    const inputBlurHandler = (event) => {
        dispatch({
            type: 'INPUT_BLUR',
        })
    };

    const reset = () => {
        dispatch({
            type: 'RESET',
        })
    }

    return {
        value: inputState.enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };

};

export default useInput;
