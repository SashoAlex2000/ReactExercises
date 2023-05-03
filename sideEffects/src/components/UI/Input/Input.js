import React, { useContext, useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

// beside props, we also receive ref
// pass the component to React.forwardRef
// it 
const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        // second argument is a function returning an object, 
        // with key of external keyword, which will use internal 
        return {
            focus: activate,
        }
    })

    return (
        <div
        className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
            }`}
    >
        <label htmlFor={props.id}>{props.label}</label>
        <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    </div>
    );

});

export default Input;
