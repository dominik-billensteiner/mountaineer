import React, { useState, useEffect } from "react";
import Tour from "../Tour/Tour";
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
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <Bar list={tourList} setList={setTourList} />
      </div>
      <div className="app__content">
        <div className="tourlist">
          {tourList.map((tour) => {
            return (
              <Tour
                key={tour.id}
                elevation={tour.elevation}
                date={tour.date}
                title={tour.title}
                distance={tour.distance}
                duration={tour.duration}
                ascent={tour.ascent}
                descent={tour.descent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Mountaineer;
