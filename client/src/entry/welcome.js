import React, { useContext } from 'react';
import {UserContext} from '../entry/userContext.js';

function Welcome(props) {

  const [user, setUser] = useContext(UserContext);

  const onLogout = async () => {
    const res = await fetch('/users/logout');
    const resData = await res.json();
    if(resData === "logout success") {
      setUser("");
      props.history.push('/');
    }
    console.log('logout now');
  }


  return (
    <div className="entry-container">
      <h1 className="entry-title"> Welcome </h1>
      <p className="normal-text">To get started click the menu at the top left</p>
      <button onClick={onLogout} className="submit logout">Logout</button>
    </div>
  );
}

export default Welcome;