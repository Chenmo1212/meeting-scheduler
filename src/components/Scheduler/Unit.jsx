import React from 'react';

const Unit = ({
                width,
                onUnitMouseDown,
                onUnitMouseEnter,
                onUnitMouseUp,
                onUnitDragEnter,
              }) => {
  return (
    <div
      className="unit"
      style={{width: width + "%"}}
      onMouseDown={onUnitMouseDown}
      onMouseEnter={onUnitMouseEnter}
      onMouseUp={onUnitMouseUp}
      onDragEnter={onUnitDragEnter}
    />
  );
};

export default Unit;
