import React, {useEffect, useState} from 'react';

const Event = ({
                 height = '100%',
                 start = 0,
                 end = 1,
                 units,
                 isEdit,
                 isMove,
                 unitWidth,
                 currRoomIdx,
                 currUnitIdx,
                 editInitEndIdx,
                 setIsEdit,
                 setIsMove,
                 setEditInitStartIdx,
                 setEditInitEndIdx,
                 setEvents
               }) => {
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState('0');
  const [left, setLeftOffset] = useState('0px');
  const [startMouseX, setStartMouseX] = useState(null);
  const [isShow, setVisibility] = useState(false);

  useEffect(() => {
    setWidth((end - start) * unitWidth + "px");
    setLeftOffset(start * unitWidth + "px");
  }, [start, end, unitWidth]);

  useEffect(() => {
    if (isEdit) onDragOver();
  }, [currUnitIdx])

  const onDragStart = (e) => {
    console.log("[onDragStart]");
    if (!isEdit && e) {
      setIsMove(true);
      setOpacity(0.5);
      setStartMouseX(e.clientX);
    }
  }

  const onDragEnd = (e) => {
    console.log("[onDragEnd]");

    if (isMove && !isEdit) {
      let moveXPx = e.clientX - startMouseX;
      let unitAmount = Math.floor(moveXPx / unitWidth);
      let halfWidth = unitWidth / 2;
      let modXPx = Math.floor(moveXPx % unitWidth);
      if (moveXPx < 0 && Math.abs(modXPx) >= halfWidth) {
        unitAmount--;
      }

      if (start + unitAmount >= 0 && end + unitAmount <= units.length) {
        setEvents([{
          start: start + unitAmount,
          end: end + unitAmount
        }]);
      }
      setIsMove(false);
    }
    setOpacity(1);
  }

  const onDragOver = (e) => {
    console.log("[onDragOver]");
    if (!isEdit) return;

    if (e) {
      let movePx = e.clientX - startMouseX;
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
    setStartMouseX(e.clientX);
    setEditInitStartIdx(start);
    setEditInitEndIdx(end);
    setIsEdit(true);
    setOpacity(0.5);
  }

  const editEventEnd = () => {
    console.log("[editEventEnd]");

    setStartMouseX(null);
    setEditInitStartIdx(-1);
    setEditInitEndIdx(-1);
    setIsEdit(false);
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
