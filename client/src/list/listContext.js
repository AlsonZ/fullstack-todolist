import React,{useState, createContext, useContext, useEffect} from 'react';

export const ListContext = createContext(
//     {
//     user: "",
//     setUser: () => {}
// }
);

export const ListProvider = (props) => {
  const [lists, setLists] = useState([]);
  return(
    <ListContext.Provider value={[lists, setLists]}>
      {props.children}
    </ListContext.Provider>
  );
}