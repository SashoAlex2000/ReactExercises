import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signUpHandler = (event) => {

        event.preventDefault();

        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(userCredentials);
            localStorage.setItem('currentUserId', userCredentials.user.uid);
        }).catch((err) => console.log(err));
    }

    return <div className="signin-container">

        <form onSubmit={signUpHandler}>
            <h1>Create and account Here</h1>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter p455" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">SignUp</button>
        </form>

    </div>

};


export default SignUp;

