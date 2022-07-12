import { useState, useContext, useRef, useEffect } from "react";
import NotesContext from "./context";
import React from 'react';

const AddNote = () => {
  const { state, dispatch } = useContext(NotesContext);
  const [value, setValue] = useState("");

  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Cannot add a blank note");
    } else {
      dispatch({ type: "ADD_NOTE", payload: value });
      setValue("");
    }
  };
  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            ref={ref} 
            onChange={handleChange} 
            value={value}/>
        <button className="addBtn">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
