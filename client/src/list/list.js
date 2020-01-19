import React, { useState, useEffect, useRef } from 'react';
import ListElement from './listelement';
import './list.css';
import './addIcon.css';
import {ReactComponent as TrashCanIcon} from './trashCan.svg';


function List(props) {

  const [listName, setListName] = useState('Todo-list');
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("plus");
  const [box, setBox] = useState("");
  const [minusIcon, setMinusIcon] = useState("");
  const inputElement = useRef(null);
 
  useEffect(() => {
    if(props.location.name === undefined || props.location.index === undefined) {
      props.history.push('/welcome');
    }
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    if(props.location.name) {
      checkSavedLists();
      setListName(props.location.name);
    }
    // eslint-disable-next-line
  }, [props.location.name]);

  const fetchList = async () => {
    const res = await fetch('/lists/getList/'+props.location.index);
    const resData = await res.json();
    return(resData.array);
  }
  const checkSavedLists = async () => {
    const arrayList = await fetchList();
    if(arrayList) {
      setElements([...arrayList,]);
    }
    
  }
  
  const openBox = () => {
    if(action === "plus") {
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

  const deleteList = async () => {
    let url = '/lists/deleteList';
    let data = {
      name: props.location.name,
      action: 'delete',
      _id: props.location._id,
    }
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    console.log('this is delete list');
    console.log(resData);
    if(resData === "Success") {
      props.location.setUpdateList(true);
      props.history.push('/welcome');
    }
  }

  const saveNewElement = async (item) => {
    let url = '/lists/modifyList/create';
    let data = {
      name: listName,
      action: 'create',
      item: item,
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    if(resData === 'Success') {
      checkSavedLists();
    }
  }

  const addElement = async (event) => {
    if(event.key === "Enter") {
      await saveNewElement(event.target.value);
      inputElement.current.value = '';
    }
  }

  return (
    <div className="container">
      <h1 className="title">
          <span onClick={deleteList} className="delete-list">
            <TrashCanIcon className="icon"/>
          </span>
        <p className="title-text">{listName}</p>
        <span onClick={openBox} className="iconToggle" > 
          <span className={`addIcon ${minusIcon}`}/>
        </span>
      </h1>
      <input type="text" autoFocus ref={inputElement} placeholder="Add a new Todo" className={`addElementInput ${box}`}onKeyPress={addElement}/>
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
