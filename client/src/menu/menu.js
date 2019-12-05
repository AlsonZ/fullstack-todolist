import React, {useState} from 'react';
import './menu.css';

function Menu() {

  const [menu, setMenu] = useState("");
  const [menuItems, setMenuItems] = useState("");

  const menuClick = () => {
    if(menu == "") {
      setMenu("menu");
      setMenuItems("menu-items");
    } else {
      setMenu("");
      setMenuItems("");
    }
  }

  return (
    <div className={"button-outside" + " " + menu}>
      <div onClick={menuClick} className="hamburger-box">
        <div className="hamburger"/>
      </div>
      <div className={"list" + " " + menuItems}>
        <ul>
          <li>
            <a href>List 1</a>
          </li>
          <li>
            <a href>List 2</a>
          </li>
          <li>
            <a href>List 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
