import { useContext } from "react";
import NotesContext from "./context";
import React from 'react';

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  return (
    <div className="note">
      <p style={{color: "black"}}>{note.text}</p>
      <div className="btn-container">
        <button
          className="edit"
          onClick={() => dispatch({ type: "SET_CURRENT_NOTE", payload: note })}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Note;
