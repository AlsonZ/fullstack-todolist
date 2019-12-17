import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {ListContext} from '../list/listContext'
import {NotificationContext} from '../notification/notificationContext.js';
import './menu.css';

function Menu() {

  const [navOpen, setNavOpen] = useState("");
  const [menuItems, setMenuItems] = useState("");
  const [lists, setLists] = useContext(ListContext);
  const [notif, setNotif] = useContext(NotificationContext);

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
    if(event.key === "Enter") {
      //make new list by adding to context
      // do not add it here because it may be a duplicate name
      const name = event.target.value
      const listObj = { [name]: [] };
      
      // send newList to database
      let url = "/lists/addNewList";
      let data = {listObj: listObj};
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
      console.log(resData);
      // console.log(event.target.value);
      // event.target.value = '';
    }
  }

  return (
    <div className={"nav" + " " + navOpen}>
      <div onClick={menuClick} className="hamburger-box">
        <div className="hamburger"/>
      </div>
      <ul className="menu-list">
        <Link to='/login' className="links"><li className="list-element">Login</li></Link>
        <Link to='/' className="links"><li className="list-element">List 1</li></Link>
        {/* have array.map on list of lists, 
        then use array[0] as name, past that is the list elements
        need to also make the menu not exceed a certain width and add scrollbar if so*/}
        {lists.map((list, i) => <Link key = {i} to='/' className="links"><li className="list-element">{Object.keys(list)}</li></Link>)}
        <li className="input-list-element">
          <input type="text" onKeyPress={createNewList} className="add-new-list-input" placeholder="New List Name"/>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
