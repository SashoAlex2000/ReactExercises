import { useEffect, useState } from "react";

// we need to put 'use' at the beginning is necessary; for React to know it is a hook
// and should follow the rules of hooks
export const useCounter = (goForward = true) => {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            if (goForward) {
                setCounter((prevCounter) => prevCounter + 1);
            } else {
                setCounter((prevCounter) => prevCounter - 1);
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [
        goForward, // added as a dependency, to ensure that the effect reruns if the value changes;
    ]);

    // returns the counter state
    return counter;

};
