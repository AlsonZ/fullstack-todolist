import React, {useState} from 'react';
import {ReactComponent as TrashCanIcon} from './trashCan.svg';
import {ReactComponent as EditIcon} from './edit.svg';
import {ReactComponent as CompleteIcon} from './complete.svg';
import './style.css';

function ListElement(props) {

  const [editing, setEditing] = useState(false);
  const [strikethrough, setStrikethrough] = useState("");

  const deleteElement = () => {
    var array = [...props.elements]
    array.splice(props.index, 1);
    props.setElements(array);
  }
  const switchAction = () => {
    if(editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }
  const finishEdit = (event) => {
    if(event.key === "Enter") {
      setEditing(false);
    }
  }
  const addChanges = (event) => {
    var array = [...props.elements]
    array[props.index].text = event.target.value;
    props.setElements(array);
  }

  const changeCSS = () => {
    if(strikethrough === "textStrikethrough") {
      setStrikethrough("");
    } else {
      setStrikethrough("textStrikethrough");
    }
  }

  return (
    <div className="listElement">
      <span onClick={deleteElement} className="deleteElement"><TrashCanIcon className="icon"/></span>
      {!editing && <span onClick={changeCSS} className={"textElement" + " " +strikethrough}>{props.text}</span>}
      {editing && <input type="text" autoFocus defaultValue={props.text} onChange={addChanges} onKeyPress={finishEdit} className="editElementInput"/>}
      {!editing && <span onClick={switchAction} className="editElement"><EditIcon className="icon"/></span>}
      {editing && <span onClick={switchAction} className="editElement"><CompleteIcon className="icon"/></span>}
    </div>
  );
}

export default ListElement;
