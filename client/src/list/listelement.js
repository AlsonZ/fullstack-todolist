import React, {useState} from 'react';
import {ReactComponent as TrashCanIcon} from './trashCan.svg';
import {ReactComponent as EditIcon} from './edit.svg';
import {ReactComponent as CompleteIcon} from './complete.svg';
import './list.css';

function ListElement(props) {

  const [editing, setEditing] = useState(false);
  const [strikethrough, setStrikethrough] = useState("");

  const deleteElement = async () => {
    let url = '/lists/modifyList/delete';
    let data = {
      name: props.listName,
      action: 'delete',
      _id: props._id,
      item: props.text,
    };
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    if(resData === 'Success') {
      var array = [...props.elements]
      array.splice(props.index, 1);
      props.setElements(array);
    }
    
  }
  const switchAction = () => {
    if(editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }
  const finishEdit = async (event) => {
    if(event.key === "Enter") {
      setEditing(false);
      let url = '/lists/modifyList/modify';
      let data = {
        name: props.listName,
        action: 'modify',
        _id: props._id,
        item: props.text,
      };
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if(resData === 'Success') {
      }
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
      {!editing && <span onClick={changeCSS} className={`textElement ${strikethrough}`}>{props.text}</span>}
      {editing && <input type="text" autoFocus defaultValue={props.text} onChange={addChanges} onKeyPress={finishEdit} className="editElementInput"/>}
      {!editing && <span onClick={switchAction} className="editElement"><EditIcon className="icon"/></span>}
      {editing && <span onClick={switchAction} className="editElement"><CompleteIcon className="icon"/></span>}
    </div>
  );
}

export default ListElement;
