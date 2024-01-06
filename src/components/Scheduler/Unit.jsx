import React from 'react';

const Unit = ({
                width,
                onUnitMouseDown,
                onUnitMouseUp,
                onUnitDragEnter,
              }) => {

  const cancelDefault = (e) => {
    e.preventDefault();
  }

  return (
    <div
      className="unit"
      style={{width: width + "%"}}
      onMouseDown={onUnitMouseDown}
      onMouseUp={onUnitMouseUp}
      onDragEnter={onUnitDragEnter}
      onDragOver={cancelDefault}
    />
  );
};

export default Unit;
