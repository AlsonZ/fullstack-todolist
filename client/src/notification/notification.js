import React, {useState, useEffect, useContext } from 'react';
import {NotificationContext} from './notificationContext.js';
import './notification.css';

function Notification(props) {

  const [active, setActive] = useState('');
  const [notif, setNotif] = useContext(NotificationContext);
  useEffect(() => {
    console.log('this is useEffect');
    if(notif !== 'none') {
      setActive('notify-user');
      setTimeout(() => {
        setActive('');
        setTimeout(() => {
          setNotif('none');
        }, 500);
      }, 2000);
    }
  },[notif]);

  return (
    <div className={"notification" + " " + active}>{notif}</div>
  )
}

export default Notification;