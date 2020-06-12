import React, { useState } from "react";
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
      id: 12456,
      mountain: "Schoberstein",
      elevation: 1285,
      date: "29.04.2020",
      description: "Südanstieg Molln",
      distance: 9,
      duration: "3:15",
      ascent: 880,
      descent: 870,
    },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <Bar />
      </div>
      <div className="app__content">
        {tourList.map((tour) => {
          return (
            <Tour
              mountain={tour.mountain}
              elevation={tour.elevation}
              date={tour.date}
              description={tour.description}
              distance={tour.distance}
              duration={tour.duration}
              ascent={tour.ascent}
              descent={tour.descent}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Mountaineer;
