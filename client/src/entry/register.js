import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './entry.css';

function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('placeholder');

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
      let url = '/users/register';
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
      if(resData === "registered") {
        setEmail('');
        setPassword('');
        props.history.push('/');
      } else {
        setErrorMessage('This Email has already been registered');
        setError("error-visible");
      }
    }
  }

  return (
    <form className="entry-container">
      <h1 className="entry-title">Register</h1>
      <p className={`error-text ${error}`}>{errorMessage}</p>
      <input type="email" placeholder="Email" className="input" onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
      <input type="password" placeholder="Password" className="input" onChange={event => setPassword(event.target.value)} autoComplete="off"></input>
      <input type="submit" onClick={onClick} className="submit" value="REGISTER"></input>
      <Link to='/' className="entry-link">Already have an account? Sign in</Link>
    </form>
  );
}

export default Register;
