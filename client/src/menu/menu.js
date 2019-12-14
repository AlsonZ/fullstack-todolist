import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './menu.css';

function Menu() {

  const [navOpen, setNavOpen] = useState("");
  const [menuItems, setMenuItems] = useState("");

  const menuClick = () => {
    if(navOpen == "") {
      setNavOpen("nav-open");
      setMenuItems("menu-items");
    } else {
      setNavOpen("");
      setMenuItems("");
    }
  }

  return (
    <div className={"nav" + " " + navOpen}>
      <div onClick={menuClick} className="hamburger-box">
        <div className="hamburger"/>
      </div>
      <ul className="menu-list">
        <Link to='/login' className="links"><li>Login</li></Link>
        <Link to='/' className="links"><li>List 1</li></Link>
      </ul>
    </div>
  );
}

export default Menu;
