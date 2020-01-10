import React, { useState, useEffect, useRef, useContext } from 'react';
import ListElement from './listelement';
import './list.css';
import './addIcon.css';
import {UserContext} from '../entry/userContext.js';
import {ListContext} from '../list/listContext'

function List(props) {

  const [listName, setListName] = useState('Todo-list');
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("plus");
  const [box, setBox] = useState("");
  const [minusIcon, setMinusIcon] = useState("");
  const inputElement = useRef(null);
 
  useEffect(() => {
    console.log(props.location.name);
    if(props.location.name) {
      checkSavedLists();
      setListName(props.location.name);
    }
  }, [props.location.name]);

  const fetchList = async () => {
    const res = await fetch('/lists/getList/'+props.location.index);
    const resData = await res.json();
    console.log('fetchlist has run');
    console.log(resData);
    return(resData.array);
  }
  const checkSavedLists = async () => {
    const arrayList = await fetchList();
    console.log('arraylist check')
    console.log(arrayList)
    if(arrayList) {
      setElements([
        ...arrayList,
        // {text:"testing text"}, 
        // {text:"text that is sorta long enough so it just fits"},
        // {text:"text that is super super long so that i can see how the span handles the super long sentences"},
      ]);
    }
    
  }
  
  const openBox = () => {
    if(action == "plus") {
      setAction("minus");
      setBox("openBox");
      setMinusIcon("minusIcon");
    } else {
      setAction("plus");
      setBox("");
      setMinusIcon("");
      inputElement.current.focus();
    }
  }

  const saveNewElement = async (item) => {
    console.log('this is elements from list.js');
    console.log(elements);
    console.log(item);
    let url = '/lists/modifyList/create';
    let data = {
      name: listName,
      action: 'create',
      // create has no _id
      item: item,
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    console.log('this be resDta from list');
    console.log(resData);
    if(resData === 'Success') {
      console.log('yes');
      // setElements([...elements, {text:item}]);
      // getList again to get id of new element
      checkSavedLists();
    }
  }

  const addElement = async (event) => {
    if(event.key === "Enter") {
      await saveNewElement(event.target.value);
      console.log('test inputelement reference');
      inputElement.current.value = '';
    }
  }

  

  return (
    <div className="container">
      <h1 className="title">
        {listName}
        <span onClick={openBox} className="iconToggle" > 
          <span className={"addIcon" + " " + minusIcon}/>
        </span>
      </h1>
      <input type="text" autoFocus ref={inputElement} placeholder="Add a new Todo" className={"addElementInput" + " " + box}onKeyPress={addElement}/>
      {elements.map((object, index) => {
        const listElementProps = {
          key: index,
          index: index,
          setElements: setElements,
          elements: elements,
          listName: listName,
          listIndex: props.index,
          text: object.text,
          _id: object._id
        }
        return (<ListElement {...listElementProps} ></ListElement>);
      })}
    </div>
  );
}

export default List;
