import React from "react";

const NotesContext = React.createContext({
  currentNote: null,
  notes: [{ id: 1, text: "Type your note here!" }]
});

export default NotesContext;
