import { useState, useContext, useRef, useEffect } from "react";
import NotesContext from "./context";
import React from 'react';

const EditNote = () => {
  const { state, dispatch } = useContext(NotesContext);
  const [value, setValue] = useState(state.currentNote.text);

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
      dispatch({ type: "UPDATE_NOTE", payload: value });
      setValue("");
    }
  };
  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <textarea ref={ref} onChange={handleChange} value={value} />
        <div style={{ textAlign: "right" }}>
          <button>Update Note</button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
