import React from "react";
import Tour from "../Tour/Tour";
import Bar from "../Bar/Bar";
import "./style.scss";
import { isCompositeComponentWithType } from "react-dom/test-utils";

/* 
API Request for Dachstein Mountain Tours (ID: 8982361)
http://www.outdooractive.com/api/project/api-dev-oa/filter/tour?q=dachstein&category=8982361&key=yourtest-outdoora-ctiveapi

Full Category List: http://www.outdooractive.com/api/project/api-dev-oa/category/tree?key=yourtest-outdoora-ctiveapi
Hiking: 8982342
Mountaineering: 8982359*/

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
