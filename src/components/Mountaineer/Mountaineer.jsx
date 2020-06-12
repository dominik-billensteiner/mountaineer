import React, { useState, useEffect } from "react";
import TourInfo from "../TourInfo/TourInfo";
import Bar from "../Bar/Bar";
import "./style.scss";

// Import font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faSearch, faTrash);

/***
 * Main App file.
 */
function Mountaineer() {
  // List of tours
  const [tourList, setTourList] = useState([
    {
      id: null,
      title: "",
      elevation: null,
      date: "",
      distance: null,
      duration: null,
      ascent: null,
      descent: null,
    },
  ]);

  // Statistics from all tours
  const [stats, setStats] = useState([]);

  // Load list of tours onComponentDidMount
  useEffect(() => {
    setTourList([
      {
        id: 0,
        title: "Schoberstein",
        elevation: 1286,
        date: "20.06.2020",
        distance: 12,
        duration: 2,
        ascent: 12,
        descent: 12,
      },
    ]);
    console.log("UseEffect tourList: first time update Statistics");
    setStats(calculateStats);
  }, []);

  // Whenever tour list changes, update statistics
  useEffect(() => {
    console.log("UseEffect tourList: update Statistics");
    setStats(calculateStats);
  }, [tourList]);

  /***
   * Calculate statistics.
   * @return {Object} - Statistics object with total distance, ascent and descent.
   */
  const calculateStats = () => {
    let totalDistance = 0;
    let totalAscent = 0;
    let totalDescent = 0;
    console.log(tourList);

    tourList.map((tour) => {
      totalDistance += tour.distance;
      totalAscent += tour.ascent;
      totalDescent += tour.descent;
    });
    return {
      distance: totalDistance,
      ascent: totalAscent,
      descent: totalDescent,
    };
  };

  return (
    <div className="app">
      <div className="app__header">
        <Bar list={tourList} setList={setTourList} />
      </div>
      <div className="app__content">
        <div className="app__box">
          <h3 className="heading">Meine Statistik</h3>
          <TourInfo
            tour={{
              id: 0,
              elevation: 0,
              date: null,
              title: "",
              distance: stats.distance,
              duration: 0,
              ascent: stats.ascent,
              descent: stats.descent,
            }}
          />
        </div>
        <div className="app__box">
          <h3 className="heading">Meine Touren</h3>
          <div className="tours__list">
            {tourList.map((tour) => {
              return (
                // Display all tours with propertys
                <TourInfo
                  key={tour.id}
                  tour={{
                    id: tour.id,
                    elevation: tour.elevation,
                    date: tour.date,
                    title: tour.title,
                    distance: tour.distance,
                    duration: tour.duration,
                    ascent: tour.ascent,
                    descent: tour.descent,
                  }}
                />
                // Display control buttons
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mountaineer;
