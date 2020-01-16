import React, {useState, useEffect, useContext } from 'react';
import {NotificationContext} from './notificationContext.js';
import './notification.css';

function Notification() {

  const [active, setActive] = useState('');
  const [notif, setNotif] = useContext(NotificationContext);
  useEffect(() => {
    if(notif !== 'none') {
      setActive('notify-user');
      setTimeout(() => {
        setActive('');
        setTimeout(() => {
          setNotif('none');
        }, 500);
      }, 2000);
    }
    // eslint-disable-next-line
  },[notif]);

  return (
    <div className={`notification ${active}`}>{notif}</div>
  )
}

export default Notification;