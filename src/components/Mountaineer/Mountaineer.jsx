import React from "react";
import Tour from "../Tour/Tour";
import Bar from "../Bar/Bar";
import "./style.scss";

// Import font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faSearch, faTrash);

function Mountaineer() {
  return (
    <div className="app">
      <div className="app__header">
        <Bar />
      </div>
      <div className="app__content">
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
    </div>
  );
}
export default Mountaineer;
