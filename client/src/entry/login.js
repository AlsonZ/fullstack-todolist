import React, {useState, useContext} from 'react';
import {UserContext} from './userContext.js';
import {Link} from 'react-router-dom';
import './entry.css';

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('placeholder');
  const [, setUser] = useContext(UserContext);

  const onClick = async (event) => {
    event.preventDefault();
    if(email === "" || password === "") {
      setErrorMessage('Please fill out all fields');
      setError("error-visible");
    } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setErrorMessage('Email is invalid');
      setError("error-visible");
    } else if(password.length <= 5) {
      setErrorMessage('Password must be longer than 6 characters');
      setError("error-visible");
    } else {
      let url = '/users/login';
      let data = {
        email: email,
        password: password
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if(res.status === 200) {
        setEmail('');
        setPassword('');
        setUser(resData);
        props.history.push('/welcome');
      } else {
        setErrorMessage('The email or password is incorrect');
        setError("error-visible");
      }
    }
  }

  return (
    <form className="entry-container">
      <h1 className="entry-title">Login</h1>
      <p className={`error-text ${error}`}>{errorMessage}</p>
      <input type="email" placeholder="Email" className="input" onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
      <input type="password" placeholder="Password" className="input" onChange={event => setPassword(event.target.value)} autoComplete="off"></input>
      <input type="submit" onClick={onClick} className="submit" value="LOGIN"></input>
      <Link to='/register' className="entry-link">Don't have an account? Sign up</Link>
    </form>
  );
}

export default Login;
