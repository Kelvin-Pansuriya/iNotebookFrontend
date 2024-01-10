import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert"
import Login from "./components/Login"
import Signup from "./components/Singup"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
  document.body.setAttribute("style","color:white;background-color:#36454F;")
  return (
    <>
      <Router>
        <NoteState>
         <Navbar />
          <Alert/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/singup" element={<Signup />} />
          </Routes>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
