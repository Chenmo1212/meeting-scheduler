import React, {useEffect, useState} from 'react';

const Event = ({
                 height = '100%',
                 start = 0,
                 end = 1,
                 isEditEvent,
                 unitWidth,
                 currRoomIdx,
                 currUnitIdx,
                 editInitStartIdx,
                 editInitEndIdx,
                 setEditEvent,
                 setEditInitStartIdx,
                 setEditInitEndIdx,
                 setEvents
               }) => {
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState('0');
  const [left, setLeftOffset] = useState('0px');
  const [editStartMouseX, setEditStartMouseX] = useState(null);
  const [isShow, setVisibility] = useState(false);

  useEffect(() => {
    setWidth((end - start) * unitWidth + "px");
    setLeftOffset(start * unitWidth + "px");
  }, [start, end, unitWidth]);

  useEffect(() => {
    if (isEditEvent) onDragOver();
  }, [currUnitIdx])

  const onDragStart = () => {
    console.log("[onDragStart]");
  }

  const onDragEnd = () => {
    console.log("[onDragEnd]");
  }

  const onDragOver = (e) => {
    console.log("[onDragOver]");
    if (!isEditEvent) return;

    if (e) {
      let movePx = e.clientX - editStartMouseX;
      setEvents([{start: start, end: editInitEndIdx + Math.floor(movePx / unitWidth) + 1}]);
    } else {
      if (currUnitIdx > start && !e) setEvents([{start: start, end: currUnitIdx}]);
    }
  }

  const onEventMouseDown = () => {
    console.log("[onEventMouseDown]");
  }

  const onEventMouseUp = () => {
    console.log("[onEventMouseUp]");
  }

  const onEventClick = () => {
    console.log("[onEventClick]");
  }

  const editEventStart = (e) => {
    console.log("[editEventStart]", e.clientX);
    setEditStartMouseX(e.clientX);
    setEditInitStartIdx(start);
    setEditInitEndIdx(end);
    setEditEvent(true);
    setOpacity(0.5);
  }

  const editEventEnd = () => {
    console.log("[editEventEnd]");

    setEditStartMouseX(null);
    setEditInitStartIdx(-1);
    setEditInitEndIdx(-1);
    setEditEvent(false);
    setOpacity(1);
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
      onMouseDown={onEventMouseDown}
      onMouseUp={onEventMouseUp}
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
