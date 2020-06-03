import React from "react";
import Tour from "../Tour/Tour";

// Outdooractive API key (currently test-version)
const apiKey = "yourtest-outdoora-ctiveapi";
// Outdooractive API project (currently test-version)
const apiProject = "api-dev-oa";

function App() {
  const getData = async (query) => {
    try {
      // Full text search (POIs and tours) on OutdoorActive API returns an id list
      const apiRes = await fetch(
        `http://www.outdooractive.com/api/search/?q=${query}&key=${apiKey}&project=${apiProject}`
      );

      // Convert response to JSON
      const res = await apiRes.json();

      // Check request status
      if (res.cod.toString() === "200") {
        // Successful request
        console.log("success");
        console.log(res);
      } else console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

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
