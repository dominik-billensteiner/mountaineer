import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import "./Bar.scss";

const Bar = ({ list, setList }) => {
  return (
    <div className="bar">
      <SearchBox list={list} setList={setList} />
    </div>
  );
};

export default Bar;
