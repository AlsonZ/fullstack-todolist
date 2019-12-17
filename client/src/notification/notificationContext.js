import React,{useState, createContext} from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const [notif, setNotif] = useState('none');
  return(
    <NotificationContext.Provider value={[notif, setNotif]}>
      {props.children}
    </NotificationContext.Provider>
  );
}