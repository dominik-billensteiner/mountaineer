import React from "react";
import "./Tour.scss";

const Tour = () => {
  return (
    <div className="tour">
      <div className="tour__container">
        <div className="tour__mountainer-container">
          <h2 className="tour__mountain">Schoberstein</h2>
          <h3 className="tour__date">31.05.2020</h3>
        </div>
        <h3 className="tour__elevation">1285</h3>
      </div>
      <div className="tour__container">
        <h3 className="tour__distance">12.5</h3>
        <h3 className="tour__duration">3:10</h3>
        <h3 className="tour__ascent">965</h3>
        <h3 className="tour__descent">980</h3>
      </div>
    </div>
  );
};

export default Tour;
