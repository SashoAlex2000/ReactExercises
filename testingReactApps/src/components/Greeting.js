import { useState } from "react";
import Output from "./Output";


const Greeting = () => {

    const [shouldChangeText, setShouldChangeText] = useState(false);

    const changeTextHandler = () => {
        setShouldChangeText(!shouldChangeText);
    }
    
    return (
        <div>
            <h2>
                Greetings
            </h2>
            {!shouldChangeText &&<Output>Testing...</Output>}
            {shouldChangeText &&<Output>Changed the text</Output>}
            <button onClick={changeTextHandler}></button>
        </div>
    )

}; 

export default Greeting;
