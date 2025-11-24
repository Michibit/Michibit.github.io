import React from "react";
import "./App.scss";
import Main from "./containers/Main";
import CustomCursor from "./components/cursor/CustomCursor";

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Main />
    </div>
  );
}

export default App;