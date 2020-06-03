import React from "react";
import "./Tour.scss";

const Tour = () => {
  return (
    <div className="tour">
      <h2 className="tour__date">31.05.2020</h2>
      <h2 className="tour__mountain">Schoberstein</h2>
      <p className="tour__elevation">1285</p>
      <div className="elevation-gain__wrapper">
        <p>965</p>
      </div>
      <div className="distance__wrapper"></div>
      <p>10.5</p>
    </div>
  );
};

export default Tour;
