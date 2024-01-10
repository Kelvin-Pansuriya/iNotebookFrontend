import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
function Addnotes() {
    const context = useContext(NoteContext);
    const { addNotes } = context;

    const [adding, setAdding] = useState({title:"",description:"",tag:""})
    
    const onchanges = (event)=>{
      setAdding({...adding,[event.target.name]:event.target.value})
    }

    const addingNotes = (event)=>{
      event.preventDefault() // After OnClick Site Will Be Not Reload That's Why We Used "event.preventDefault()"
      addNotes(adding.title,adding.description,adding.tag)
      setAdding({title:"",description:"",tag:""})
    }
  return (
    <div className="container py-3">
      <h2 className="my-2">Add Your Notes</h2>
      <form className="my-4">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" required minLength={5} id="title" value={adding.title} name="title" onChange={onchanges}/>
          <small className="form-text text-muted">
            Enter Your Notes Title....
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" required minLength={5} id="description" value={adding.description} name="description" onChange={onchanges}/>
          <small className="form-text text-muted">
            Enter Your Notes Description....
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" value={adding.tag} name="tag" onChange={onchanges}/>
          <small className="form-text text-muted">
            Enter Your Notes Tag....
          </small>
        </div>
        <button type="submit" disabled={adding.title.length < 5 ? true : adding.description.length < 5 ? true:false} className="btn btn-primary" onClick={addingNotes}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Addnotes;
