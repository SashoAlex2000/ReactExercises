import logo from './logo.svg';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import HomePage from './components/HomePage';

function App() {
  return <div className="app-container">
      <SignIn />
      <SignUp/>
      <br></br>
      <HomePage />
    </div>
}

export default App;
