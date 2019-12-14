import React,{useState, createContext, useContext, useEffect} from 'react';

export const ListContext = createContext(
//     {
//     user: "",
//     setUser: () => {}
// }
);

export const ListProvider = (props) => {
  const [list, setList] = useState({
  });
  return(
    <ListContext.Provider value={[list, setList]}>
      {props.children}
    </ListContext.Provider>
  );
}