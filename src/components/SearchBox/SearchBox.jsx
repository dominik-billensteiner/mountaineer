import React, { useState } from "react";
import "./SearchBox.scss";
import { isCompositeComponentWithType } from "react-dom/test-utils";

// Constants for outdooractive API data
const API_KEY = "yourtest-outdoora-ctiveapi"; // API key (currently test-version)
const API_PROJECT = "api-dev-oa"; // API project (currently test-version)
const API_CAT_HIKING = "8982342"; // Category ID for Hiking
const API_CAT_MOUNTAINEERING = "8982359"; // Category ID for Mountaineering
const API_LANGUAGE = "de"; // Language code

/***
 * Enables searching for tours registered in the API.
 * Search results are entered in a searchbox and displayed in a dropdown list.
 * On selection of a item the add tour display is shown.
 */
const SearchBox = () => {
  // Search query to add a tour (Userinput)
  const [tourQuery, setTourQuery] = useState("");

  // Search results to display a suggestions for the user input
  const [searchResults, setSearchResults] = useState([]);

  // Awaiting a tour selection by the user, true if user committed a search
  const [committedSearch, setCommittedSearch] = useState(false);

  // Loading is enabled, when data is beeing fechted from API
  const [loading, setLoading] = useState(false);

  /**
   * Gets list of tours from API.
   *
   * @param {string} query - Search query for tour (user input).
   */
  const getTourList = async (query) => {
    // Early return on empty query
    if (query === "" || query === null) {
      return;
    }

    // Reset search results
    setSearchResults("");

    // Set loading state
    setLoading(true);

    // Search has been committed
    setCommittedSearch(true);

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

      // If promised is resolved, body of response contains retreived id list
      const idList = await rawResponse.json();

      // Return if no search results have been found
      if (isEmptyArray(idList.data)) return;

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
      console.error(`ERROR ERROR: ${e}`);
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

      // If promised is resolved, body of response contains tours with all attributes
      const data = await rawResponse.json();

      // Proceed if response was successfull
      if (rawResponse.status.toString() === "200") {
        // Assign tour data (located in a subarray called "tour") to state variable searchResults
        setSearchResults(data.tour);
      } else {
        // Throw error if request was not successfull
        console.error(
          `[getTourData] Error fetching tour data from API: Status ${rawResponse.status.toString()}`
        );
      }
    } catch (e) {
      // Throw error if any error occured
      console.error(
        `[getTourData] Error fetching tour data from API: Status ${e}`
      );
    }
  };

  /***
   * Handles search request.
   */
  const handleSearch = (e) => {
    // Prevent default
    e.preventDefault();

    // Get list of search results
    getTourList(tourQuery);

    // Unset loading state
    setLoading(false);
  };

  /***
   * Handles tour selection.
   */
  const handleTourSelection = (e) => {
    setCommittedSearch(false);
  };

  /***
   * Check if given array is empty.
   * @return {Boolean} - Returns true if empty.
   */
  const isEmptyArray = (arr) => {
    if (!Array.isArray(arr)) {
      return true;
    }
  };

  return (
    <>
      <form className="searchbox">
        <input
          className="searchbox__input text"
          type="text"
          id="searchbox"
          value={tourQuery}
          placeholder="Tour hinzufügen ..."
          onChange={(e) => setTourQuery(e.target.value)}
        />
        <div className="searchbox__clear-btn">
          <span
            onClick={(e) => {
              setTourQuery("");
              setCommittedSearch(false);
            }}
          >
            X
          </span>
        </div>
        <button
          className="searchbox__btn"
          onClick={(e) => {
            handleSearch(e);
          }}
        />
      </form>
      {committedSearch && loading ? (
        // Search committed, but API still loading - display loading spinner
        <div className="searchbox__results">
          <div className="searchbox__item-wrapper">
            <div className="searchbox__item">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {committedSearch && !loading ? (
        // Search committed, loading finished
        <div className="searchbox__results">
          {isEmptyArray(searchResults) ? (
            // No search results have been found
            <div className="searchbox__item-wrapper">
              <div
                className="searchbox__item"
                onClick={(e) => {
                  handleTourSelection(e);
                }}
              >
                <span>Keine Ergebnisse gefunden.</span>
              </div>
            </div>
          ) : (
            // Display list of search results
            searchResults.map((result) => {
              return (
                <div key={result.id} className="searchbox__item-wrapper">
                  <div
                    className="searchbox__item"
                    onClick={(e) => {
                      handleTourSelection(e);
                    }}
                  >
                    <span>{result.title}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </>
  );
};

export default SearchBox;
