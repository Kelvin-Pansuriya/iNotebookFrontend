import React from "react";
import Notes from "./Notes";
import Addnotes from "./Addnotes";

function Home() {
  return (
    <div>
      <Addnotes/>
      <div className="container my-1">
        <h2 className="py-1">Your Notes</h2>
      </div>
      <div className="container my-2">
        <Notes/>
      </div>
    </div>
  );
}

export default Home;
