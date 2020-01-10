import React, {useState, useContext} from 'react';
import {UserContext} from './userContext.js';
import {ListContext} from '../list/listContext.js';
import {Link} from 'react-router-dom';
import './entry.css';

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('placeholder');
  const [user, setUser] = useContext(UserContext);
  const [lists, setLists] = useContext(ListContext);

  const fetchList = async () => {
    // console.log('this be list stuff first');
    const res = await fetch('/lists/getlists');
    const resData = await res.json();
    if(resData == "No list for User") {
      console.log(resData);
    } else {
      console.log('this be list stuff from login');
      console.log(resData);
      setLists(resData);
      // console.log(resData[0]);
      // console.log(resData[0].items);
      // setLists(resData[0].items);
    }
  }

  const onClick = async (event) => {
    event.preventDefault();
    if(email == "" || password == "") {
      setErrorMessage('Please fill out all fields');
      setError("error-visible");
    } else {
      let url = '/users/login';
      let data = {
        email: email,
        password: password
      }
      //send data to backend
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      //get data back transform from json
      const resData = await res.json();
      // console.log(resData);    
      if(resData !== "failure") {
        //1. login properly -> clear fields -> send to list 1
        setEmail('');
        setPassword('');
        setUser(resData);
        // console.log(resData);
        // console.log(user);
        fetchList();
        // push to welcome screen instead of that
        // open up the menu too to show where to make a new list

        props.history.push('/');
      } else {
        //2. error msg 
        setErrorMessage('The email or password is incorrect');
        setError("error-visible");
      }
    }
  }

  return (
    <form className="entry-container">
      <h1 className="entry-title">Login</h1>
      {/* <h1 className="title">Email</h1> */}
      <p className={"error-text" + " " + error}>{errorMessage}</p>
      <input type="email" placeholder="Email" className="input" onChange={event => setEmail(event.target.value)}></input>
      {/* <h1 className="title">Password</h1> */}
      <input type="password" placeholder="Password" className="input" onChange={event => setPassword(event.target.value)}></input>
      <input type="submit" onClick={onClick} className="submit" value="LOGIN"></input>
      <Link to='/register' className="entry-link">Don't have an account? Sign up</Link>
    </form>
  );
}

export default Login;
