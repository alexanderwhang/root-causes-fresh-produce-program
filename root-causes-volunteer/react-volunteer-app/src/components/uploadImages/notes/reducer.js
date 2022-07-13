import React from "react";
import { v4 } from "uuid";

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_NOTE":
      return {
        ...state,
        currentNote: action.payload
      };
    case "DELETE_NOTE":
      const deletedNotes = state.notes.filter(
        (note) => note.id !== action.payload
      );
      return {
        ...state,
        notes: deletedNotes
      };
    case "ADD_NOTE":
      const newNote = {
        id: v4(),
        text: action.payload
      };
      const addedNotes = [...state.notes, newNote];
      return {
        ...state,
        notes: addedNotes
      };
    case "UPDATE_NOTE":
      const updatedNote = {
        ...state.currentNote,
        text: action.payload
      };

      const updatedNoteIndex = state.notes.findIndex(
        (note) => note.id === state.currentNote.id
      );
      const updatedNotes = [
        ...state.notes.slice(0, updatedNoteIndex),
        updatedNote,
        ...state.notes.slice(updatedNoteIndex + 1)
      ];
      return {
        currentNote: null,
        notes: updatedNotes
      };
    default:
      return state;
  }
}

export default reducer;
