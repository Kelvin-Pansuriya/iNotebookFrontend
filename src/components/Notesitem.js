import React, {useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

function Notesitem(props) {
  const { note, updatesAndRef } = props;
  const context = useContext(NoteContext);
  const { deleteNotes } = context;

  const deleted = ()=>{
    deleteNotes(note._id)
  }

  const edited = ()=>{
    updatesAndRef(note)
  }
  return (
      <div className="card" style={{height:"auto",color:"white",backgroundColor:"#36454F",border:"2px solid white"}}>
        <div className="card-body">
          <i className="fa-solid fa-trash my-2" onClick={deleted} style={{color: "#ffffff",cursor:"pointer"}}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={edited} style={{color: "#ffffff",cursor:"pointer"}}></i>
          <h6 className="card-title my-2">Title:- {note.title}</h6>
          <p className="card-text">Description:- {note.description}</p>
          <h6 className="card-title">Tag:- {note.tag}</h6>
        </div>
      </div>
  );
}

export default Notesitem;
