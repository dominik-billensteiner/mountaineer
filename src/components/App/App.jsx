import React from "react";
import Tour from "../Tour/Tour";
import { isCompositeComponentWithType } from "react-dom/test-utils";

/* 
API Request for Dachstein Mountain Tours (ID: 8982361)
http://www.outdooractive.com/api/project/api-dev-oa/filter/tour?q=dachstein&category=8982361&key=yourtest-outdoora-ctiveapi

Full Category List: http://www.outdooractive.com/api/project/api-dev-oa/category/tree?key=yourtest-outdoora-ctiveapi
Hiking: 8982342
Mountaineering: 8982359*/

// Constants for outdooractive API data
// API key (currently test-version)
const API_KEY = "yourtest-outdoora-ctiveapi";
// API project (currently test-version)
const API_PROJECT = "api-dev-oa";
// Catgory IDs
const API_CAT_HIKING = "8982342";
const API_CAT_MOUNTAINEERING = "8982359";
// Language code
const API_LANGUAGE = "de";

function App() {
  /**
   * Gets list of tours from API.
   *
   * @param {string} query - Input search query for tour.
   */
  const getData = async (query) => {
    try {
      // Full text search (POIs and tours) on outdooractive API returns an id list
      const rawResponse = await fetch(
        `http://www.outdooractive.com/api/search/?q=${query}&category=${API_CAT_HIKING},${API_CAT_MOUNTAINEERING}&key=${API_KEY}&project=${API_PROJECT}&lang=${API_LANGUAGE}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      );

      // If promised is resolved, body of response holds retreived id list
      const idList = await rawResponse.json();

      // Check request status
      if (rawResponse.status.toString() === "200") {
        // Successful request
        console.log("success");

        // Array of IDs retrieved via API request
        let dataIDs = [];

        // Push retrieved IDs
        idList.data.forEach((obj) => {
          dataIDs.push(obj.id);
        });

        // Get attributes for retrieved tours
        getTourData(dataIDs);
      } else console.error(`Error status: ${rawResponse.status.toString()}`);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Get attributes for all retrieved tours.
   * @param {Array} dataIDs - Array of IDs retreived via API request.
   */
  const getTourData = async (dataIDs) => {
    try {
      // Gets set of attributes from outdooractive API for every ID in the Array
      const rawResponse = await fetch(
        `http://www.outdooractive.com/api/project/api-dev-oa/oois/${dataIDs}?key=yourtest-outdoora-ctiveapi&display=list`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      );

      const tourData = await rawResponse.json();

      console.log(tourData);
    } catch (e) {
      console.log(e);
    }
  };

  getData("dachstein");

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
