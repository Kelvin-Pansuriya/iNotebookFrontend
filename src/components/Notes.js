import React, { useContext, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import Notesitem from "./Notesitem";
import NoteContext from "../context/notes/NoteContext";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes, editNotes } = context;

  const myNavigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("JwtToken")){
      fetchAllNotes();
    }
    else{
      myNavigate("/login")
    }
  }, []);

  const modalRef = useRef(null)
  const modalCloseRef = useRef(null)
  
  const [updateAdds, setUpdateAdds] = useState({id:"",editTitle:"",editDescription:"",editTag:""})

  const editOnchange = (event)=>{
    setUpdateAdds({...updateAdds,[event.target.name]:event.target.value})
  }

  const updatesAndRef = (eachNote)=>{
    modalRef.current.click()
    setUpdateAdds({
      id:eachNote._id,
      editTitle:eachNote.title,
      editDescription:eachNote.description,
      editTag:eachNote.tag
    })
  }

  const updated = (event)=>{
    // console.log(updateAdds);
    event.preventDefault()
    editNotes(updateAdds.id,updateAdds.editTitle,updateAdds.editDescription,updateAdds.editTag)
    modalCloseRef.current.click()
  }
  return (
    <>
      <div className="container">
        <button type="button" ref={modalRef} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel" style={{color:"#36454F"}}>
                  Update Your Note
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="py-2">
                  <div className="form-group">
                    <label htmlFor="title" style={{color:"#36454F"}}>Title</label>
                    <input type="text" className="form-control" id="editTitle" name="editTitle" value={updateAdds.editTitle} onChange={editOnchange} style={{color:"#36454F"}}/>
                    <small className="form-text text-muted">
                      Enter Your Notes Title For Update....
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" style={{color:"#36454F"}}>Description</label>
                    <input type="text" className="form-control" id="editDescription" name="editDescription" value={updateAdds.editDescription} onChange={editOnchange} style={{color:"#36454F"}}/>
                    <small className="form-text text-muted">
                      Enter Your Notes Description For Update....
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tag" style={{color:"#36454F"}}>Tag</label>
                    <input type="text" className="form-control" id="editTag" name="editTag" value={updateAdds.editTag} onChange={editOnchange} style={{color:"#36454F"}}/>
                    <small className="form-text text-muted">
                      Enter Your Notes Tag For Update....
                    </small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={modalCloseRef} className="btn btn-secondary d-none" data-dismiss="modal" >
                  Close
                </button>
                <button type="button" disabled={updateAdds.editTitle.length < 5 ? true: updateAdds.editDescription.length < 5 ? true:false} className="btn btn-primary m-auto" onClick={updated}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {notes ? notes.length > 0 ? notes.map((elements) => { 
            return ( 
              <div className="col-md-4 my-2" key={elements._id}>
                <Notesitem note={elements} updatesAndRef={updatesAndRef} />
              </div>
            )
          }) : <h5 className="col-12">There Is No Notes Added</h5> : <div className="col-12">There Is No Notes</div>
        }
      </div>
    </>
  );
}

export default Notes;
