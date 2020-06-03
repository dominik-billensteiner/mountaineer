import React from "react";
import PropTypes from "prop-types";
import "./Tour.scss";

const Tour = ({
  mountain,
  elevation,
  description,
  date,
  distance,
  duration,
  ascent,
  descent,
}) => {
  return (
    <div className="tour">
      <div className="tour__container">
        <div className="tour__mountainer-container">
          <h2 className="tour__mountain">
            {mountain}, {elevation} m
          </h2>
          <h3 className="tour__date">{date}</h3>
        </div>
        <h3 className="tour__description">{description}</h3>
      </div>
      <div className="tour__container">
        <h3 className="tour__distance">{distance} km</h3>
        <h3 className="tour__duration">{duration} h</h3>
        <h3 className="tour__ascent">{ascent} hm</h3>
        <h3 className="tour__descent">{descent} hm</h3>
      </div>
    </div>
  );
};

Tour.propTypes = {
  mountain: PropTypes.string,
  date: PropTypes.string,
  distance: PropTypes.number,
  duration: PropTypes.number,
  ascent: PropTypes.number,
  descent: PropTypes.number,
};

export default Tour;
