import React, {useState, useContext, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../entry/userContext.js';
import {ListContext} from '../list/listContext'
import {NotificationContext} from '../notification/notificationContext.js';
import './menu.css';

function Menu() {

  const [lists, setLists] = useContext(ListContext);
  const [user, setUser] = useContext(UserContext);
  const [notif, setNotif] = useContext(NotificationContext);
  const [navOpen, setNavOpen] = useState("");
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('placeholder');
  const [loggedIn, setLoggedIn] = useState(false);
  const inputElement = useRef(null);
  const menuElement = useRef(null);
  const [menuItems, setMenuItems] = useState("");
  

  const handleClick = (event) => {
    if(menuElement.current && !menuElement.current.contains(event.target) && navOpen !== "") {     
        menuClick();
    }
  }

  useEffect(() => {
    async function fetchList() {
      const res = await fetch('/lists/getlists');
      const resData = await res.json();
      if(resData === "No list for User") {
        // do nothing
      } else if(resData === "Email does not exist") {
        // do nothing
      } else {
        setLists(resData);
      }
    }
    async function checkCookies() {
      const res = await fetch('/users/checkCookies');
      const resData = await res.json();
      if(resData) {
        setUser(resData);
      }
    }
    if(user == "") {
      setLists([]);
      checkCookies();
    }
    if(user !== "") {
      fetchList();
    }
  },[user])

  useEffect(() => {
   document.addEventListener("mousedown", handleClick);
   return(() => {
     document.removeEventListener("mousedown", handleClick)
   });
  },[navOpen])

  useEffect(() => {
    if(user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[user])

  const menuClick = () => {
    if(navOpen == "") {
      setNavOpen("nav-open");
      setMenuItems("menu-items");
    } else {
      setNavOpen("");
      setMenuItems("");
    }
  }
  const createNewList = async (event) => {
    // need to prevent empty list with space
    const name = event.target.value
    if(event.key === "Enter") {
      if(!name.match(/([A-Z])\w+/gi)) {
        setErrorMessage('List name is invalid');
        setError("error-visible");
      } else {
        setError("");
        const listObj = { 
          'name' : name,
          'array' : [] 
        };
        let url = "/lists/addNewList";
        let data = {
          listObj: listObj
        };
        const res = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        const resData = await res.json();
        if(resData == "New List Document made") {
          setLists(previousList => [...previousList, listObj ]);
          setNotif('Success')
        } else if(resData == "Duplicate List Name") {
          setNotif('No Duplicate Names Allowed');
        } else if(resData == "Email does not exist") {
          setNotif('Please Login to create a new List');
        }
        inputElement.current.value = '';
      }
    }
  }

  return (
    <div ref={menuElement} className={"nav" + " " + navOpen}>
      <div onClick={menuClick} className="hamburger-box">
        <div className="hamburger"/>
      </div>
      <ul className="menu-list">
        {!loggedIn && <Link onClick={menuClick} to='/' className="links"><li className="list-element">Login</li></Link>}
        {loggedIn && <Link onClick={menuClick} to='/welcome' className="links"><li className="list-element">{user}</li></Link>}
        {lists.map((list, i) => 
          <Link onClick={menuClick} key = {i} to={{pathname: '/list/' + list.name, name: list.name, index: i}} className="links">
            <li className="list-element">
              {list.name}
            </li>
          </Link>
        )}
        <li className="input-list-element">
          <input type="text" ref={inputElement} onKeyPress={createNewList} className="add-new-list-input" placeholder="New List Name"/>
        </li>
        <li><p className={"error-text" + " " + error}>{errorMessage}</p></li>
      </ul>
    </div>
  );
}

export default Menu;
