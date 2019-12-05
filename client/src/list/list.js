import React, { useState, useEffect, useRef } from 'react';
import ListElement from './listelement';
import './style.css';
import './addIcon.css';

function List() {

  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("plus");
  const [box, setBox] = useState("");
  const [minusIcon, setMinusIcon] = useState("");
  const inputElement = useRef(null);

  // useEffect(() => {
  //   checkSavedLists();
  // }, []);

  const checkSavedLists = () => {
    // check cookies or w/e to determine if there is a previous list
    // if so turn the + into a - and also put into the state the list
    setElements([...elements, 
      {text:"testing text"}, 
      {text:"text that is sorta long enough so it just fits"},
      {text:"text that is super super long so that i can see how the span handles the super long sentences"},
    ]);
  }
  
  const openBox = () => {
    // make these svg's later
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

  const addElement = (event) => {
    if(event.key === "Enter") {
      setElements([...elements, {text:event.target.value}]);
      event.target.value = '';
    }
  }

  return (
    <div className="container">
      <h1>
        Todo-list
        <span onClick={openBox} className="iconToggle" > 
          <span className={"addIcon" + " " + minusIcon}/>
        </span>
      </h1>
      <input type="text" autoFocus ref={inputElement} placeholder="Add a new Todo" className={"addElementInput" + " " + box}onKeyPress={addElement}/>
      {elements.map((object, index) => {
        // convert this to context later
        return (<ListElement key={index} index={index} setElements={setElements} elements={elements} text={object.text}></ListElement>);
      })}
    </div>
  );
}

export default List;
