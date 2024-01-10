import React, {useState, useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

function Singup() {
    const { singupAuth } = useContext(NoteContext)

    const [singinData, setSinginData] = useState({name:"",email:"",password:""})

    const onchangeSignup = (event)=>{
        setSinginData({...singinData,[event.target.name]:event.target.value})
    }

    const singgedIn = (event)=>{
        event.preventDefault()
        singupAuth(singinData.name,singinData.email,singinData.password)
        setSinginData({name:"",email:"",password:""})
    }
  return (
    <>
        <div className="container my-4">
            <h3>Create New Account For iNoteBook</h3>
        </div>
        <div className="container">
            <form onSubmit={singgedIn}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required minLength={5} value={singinData.name} onChange={onchangeSignup} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required minLength={5} value={singinData.email} onChange={onchangeSignup} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required minLength={5} value={singinData.password} onChange={onchangeSignup} />
                </div>
                <button type="submit" className="btn btn-primary"> Login </button>
            </form>
        </div>
    </>
  )
}

export default Singup