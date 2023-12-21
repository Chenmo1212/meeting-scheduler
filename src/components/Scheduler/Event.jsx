import React, {useEffect, useState} from 'react';

const Event = ({
                 height = '100%',
                 start = 0,
                 end = 1,
                 units
               }) => {
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState('0');
  const [left, setLeftOffset] = useState('0px');
  const [isShow, setVisibility] = useState(false);

  useEffect(() => {
    setWidth((end - start) * 100 / units.length + "%");
    setLeftOffset(start * 100 / units.length + "%");
  }, [start, end]);

  const onDragStart = () => {
    console.log("[onDragStart]");
  }

  const onDragEnd = () => {
    console.log("[onDragEnd]");
  }

  const onDragOver = () => {
    console.log("[onDragOver]");
  }

  const onUnitMouseDown = () => {
    console.log("[onUnitMouseDown]");
  }

  const onUnitMouseUp = () => {
    console.log("[onUnitMouseUp]");
  }

  const onEventClick = () => {
    console.log("[onEventClick]");
  }

  const editEventStart = () => {
    console.log("[editEventStart]");
  }

  const editEventEnd = () => {
    console.log("[editEventEnd]");
  }

  return (
    <div
      className={'event'}
      style={{
        display: isShow ? 'none' : 'inline-block',
        opacity: opacity,
        width: width,
        height: height,
        left: left
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onMouseDown={onUnitMouseDown}
      onMouseUp={onUnitMouseUp}
      onClick={onEventClick}
    >
      <div
        className="resizable-e"
        draggable={true}
        onDragStart={editEventStart}
        onDragEnd={editEventEnd}
      />
    </div>
  );
};

export default Event;
