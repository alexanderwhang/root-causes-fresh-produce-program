import { useContext } from "react";
import NotesContext from "./context";
import Note from "./Note";
import React from 'react';

const NoteList = () => {
  const { state } = useContext(NotesContext);
  return (
    <div className="notes-container" style={{color: "black"}}>
      {state.notes.map((note, index) => {
        return <Note key={index} note={note} />;
      })}
    </div>
  );
};

export default NoteList;
