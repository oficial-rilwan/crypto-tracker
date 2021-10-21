import React from "react";

const SelectBtn = ({ children, selected, onClick }) => {
  return (
    <span
      style={{
        color: selected ? "#013046" : "",
        background: selected ? "#38b8f3" : "",
      }}
      className="select-btn"
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectBtn;
