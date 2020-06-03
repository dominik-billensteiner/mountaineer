import React from "react";
import Tour from "../Tour/Tour";

function App() {
  return (
    <div className="App">
      <Tour
        mountain="Schoberstein"
        elevation="1285"
        date="29.04.2020"
        description="Südanstieg Molln"
        distance="9.1"
        duration="3:15"
        ascent="880"
        descent="880"
      />
    </div>
  );
}

export default App;
