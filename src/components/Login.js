import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function Login() {
    const { loginAuth } = useContext(NoteContext)

    const [loginDatas, setLoginDatas] = useState({email:"",password:""})

    const onchangeLogin = (event)=>{
        setLoginDatas({...loginDatas,[event.target.name]:event.target.value})
    }

    const loggedIn = (event)=>{
        event.preventDefault()
        loginAuth(loginDatas.email,loginDatas.password)
    }
  return (
    <>
        <div className="container my-4">
            <h3>Login For Countinue To iNoteBook</h3>
        </div>
        <div className="container">
            <form onSubmit={loggedIn}>
                <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={loginDatas.email} aria-describedby="emailHelp" onChange={onchangeLogin} />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={loginDatas.password} onChange={onchangeLogin} />
                </div>
                <button type="submit" className="btn btn-primary">
                Login
                </button>
            </form>
        </div>
    </>
  );
}

export default Login;