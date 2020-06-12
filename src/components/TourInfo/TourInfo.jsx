import React from "react";
import PropTypes from "prop-types";
import "./TourInfo.scss";
// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltH,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const TourInfo = ({ tour }) => {
  /***
   * Round to specified decimal.
   */
  const round = (value, precision) => {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  // Render
  return (
    <div className="tour">
      <p className="tour__title">{tour.title}</p>
      <span className="tour__property-container">
        <div className="tour__property">
          <FontAwesomeIcon icon={faArrowsAltH} />
          <span> {tour.distance} km</span>
        </div>
        <div className="tour__property">
          <FontAwesomeIcon icon={faSortUp} />
          <span> {tour.duration} h</span>
        </div>
        <div className="tour__property">
          <FontAwesomeIcon icon={faSortUp} />
          <span> {tour.ascent} hm</span>
        </div>
        <div className="tour__property">
          <FontAwesomeIcon icon={faSortDown} />
          <span> {tour.descent} hm</span>
        </div>
      </span>
    </div>
  );
};

TourInfo.propTypes = {
  mountain: PropTypes.string,
  elevation: PropTypes.number,
  date: PropTypes.string,
  distance: PropTypes.number,
  duration: PropTypes.number,
  ascent: PropTypes.number,
  descent: PropTypes.number,
};

export default TourInfo;
