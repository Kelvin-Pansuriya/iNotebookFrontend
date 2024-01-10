import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import NoteContext from './NoteContext'

function NoteState(props) {
  const myNavigate = useNavigate()
  const host = "http://localhost:5000"
  const [notes, setNotes] = useState([])
  
  const fetchAllNotes = async ()=>{
    const fetchedData = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("JwtToken")
      }
    })
    const dataParsed = await fetchedData.json()
    // console.log(dataParsed);
    setNotes(dataParsed)
  }

  // Adding Notes....
  const addNotes = async (title,description,tag)=>{
    const addNotesDatas = await fetch(`${host}/api/notes/addnotes`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("JwtToken")
      },
      body:JSON.stringify({
        title:title,
        description:description,
        tag:tag
      })
    })
    const newAddedNote = await addNotesDatas.json()
    // console.log(dataParsed);
    setNotes(notes.concat(newAddedNote))
  }

  // Edit Notes....
  const editNotes = async (id,title,description,tag)=>{
    const editingNote = await fetch(`${host}/api/notes/updatenotes/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("JwtToken")
      },
      body:JSON.stringify({title:title,description:description,tag:tag})
    })

    let notesEdit = JSON.parse(JSON.stringify(notes))

    for(let i = 0; i<notesEdit.length; i++){
      if(notesEdit[i]._id === id){
        notesEdit[i].title = title
        notesEdit[i].description = description
        notesEdit[i].tag = tag
        break;
      }
    }
    setNotes(notesEdit)
  }

  // Delete Notes....
  const deleteNotes = async (id)=>{
    const deleteNote = await fetch(`${host}/api/notes/deletenotes/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("JwtToken")
      }
    })

    const newNotes = notes.filter((element)=>{return element._id !== id})
    setNotes(newNotes)
  }

  // SingUp....
  const singupAuth = async (name,email,password)=>{
    const singUP = await fetch(`${host}/api/auth/createuser`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    })

    const singupToken = await singUP.json()
    console.log(singupToken);
    if(singupToken.success){
      localStorage.setItem("JwtToken",singupToken.singupJwtToken)
      myNavigate("/")
    }
    else{
      myNavigate("/singup")
    }
  }

  // Login....
  const loginAuth = async (email,password)=>{
    const login = await fetch(`${host}/api/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })

    const loginToken = await login.json()
    console.log(loginToken);

    if(loginToken.success){
      localStorage.setItem("JwtToken",loginToken.loginJwtToken)
      myNavigate("/")
    }
    else{
      myNavigate("/login")
    }

  }

  return (
    <NoteContext.Provider value={{notes,addNotes,editNotes,deleteNotes,fetchAllNotes,singupAuth,loginAuth}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;