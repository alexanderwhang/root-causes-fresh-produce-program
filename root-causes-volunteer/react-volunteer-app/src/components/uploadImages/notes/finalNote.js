import React, { useContext, useReducer } from "react";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import NoteList from "./NoteList";
import NotesContext from "./context";
import notesReducer from "./reducer";
import '../../../styleSheets/addNotes.css';

export default function FinalNote() {
  const initialState = useContext(NotesContext);
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <div>
      <NotesContext.Provider value={{ state, dispatch }}>
        {state.currentNote === null ? (
          <div>
            <NoteList />
          </div>
        ) : (
          <EditNote />
        )}
      </NotesContext.Provider>
    </div>
  );
}
