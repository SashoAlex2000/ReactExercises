import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signInHandler = (event) => {

        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(userCredentials);
            localStorage.setItem('currentUserId', userCredentials.user.uid);
        }).catch((err) => console.log(err));
    }

    return <div className="signin-container">

        <form onSubmit={signInHandler}>
            <h1>Log In Here</h1>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter p455" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">LogIn</button>
        </form>

    </div>

};


export default SignIn;

