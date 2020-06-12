import React, { useState } from "react";
import "./SearchBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashAlt,
  faArrowsAltH,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

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

  // User is currently typing, or typed something in the searchbox
  const [typing, setTyping] = useState(false);

  // Displayed when in loading state
  const loadingSpinnerBlock = (
    <div className="searchbox__results">
      <div className="searchbox__spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  // Displayed if no results have been found
  const noResultsFoundBlock = (
    <div className="searchbox__item-wrapper">
      <div
        className="item"
        onClick={(e) => {
          handleTourSelection(e);
        }}
      >
        <span>Keine Ergebnisse gefunden.</span>
      </div>
    </div>
  );

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
      if (isEmptyArray(idList.data)) {
        setLoading(false);
        return;
      }

      // Check for successful request
      if (rawResponse.status.toString() === "200") {
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
        console.log(data.tour);
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
    // Unset loading state
    setLoading(false);
  };

  /***
   * Handles search request.
   */
  const handleSearch = (e) => {
    // Prevent default
    e.preventDefault();

    // Search has been committed
    setCommittedSearch(true);

    // Get list of search results
    getTourList(tourQuery);
  };

  /***
   * Handles tour selection.
   */
  const handleTourSelection = (e) => {
    setCommittedSearch(false);
  };

  /***
   * Round to specified decimal.
   */
  const round = (value, precision) => {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
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

  // Render
  return (
    <>
      <form className="searchbox">
        <input
          className="searchbox__input text"
          type="text"
          id="searchbox"
          value={tourQuery}
          placeholder="Tour hinzufügen ..."
          onChange={(e) => {
            setTyping(true);
            setTourQuery(e.target.value);
          }}
        />
        {typing ? (
          // Only show delete button if user entered something
          <div className="searchbox__btn">
            <span
              onClick={(e) => {
                setTourQuery("");
                setTyping(false);
                setCommittedSearch(false);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </div>
        ) : null}
        <button
          className="searchbox__btn"
          onClick={(e) => {
            handleSearch(e);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {committedSearch && loading
        ? // Search committed, but API still loading - display loading spinner
          loadingSpinnerBlock
        : null}
      {committedSearch && !loading ? (
        // Search committed, loading finished
        <div className="searchbox__results">
          {isEmptyArray(searchResults)
            ? // No search results have been found
              noResultsFoundBlock
            : // Display list of search results
              searchResults.map((result) => {
                return (
                  <div key={result.id} className="searchbox__item-wrapper">
                    <div
                      key={result.id}
                      className="item"
                      onClick={(e) => {
                        handleTourSelection(e);
                      }}
                    >
                      <p className="item__title">{result.title}</p>
                      <span className="item__description-container">
                        <div className="item__description">
                          <FontAwesomeIcon icon={faArrowsAltH} />
                          <span> {round(result.length / 1000, 1)} km</span>
                        </div>
                        <div className="item__description">
                          <FontAwesomeIcon icon={faSortUp} />
                          <span> {round(result.time.min / 60, 2)} h</span>
                        </div>
                        <div className="item__description">
                          <FontAwesomeIcon icon={faSortUp} />
                          <span> {result.elevation.ascent} hm</span>
                        </div>
                        <div className="item__description">
                          <FontAwesomeIcon icon={faSortDown} />
                          <span> {result.elevation.descent} hm</span>
                        </div>
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      ) : null}
    </>
  );
};

export default SearchBox;
