import React, {useEffect, useState} from 'react';

const Meeting = ({
                   height = '100%',
                   units,
                   meeting,
                   isShow,
                   isEdit,
                   isMove,
                   unitWidth,
                   currRoomId,
                   currUnitIdx,
                   editInitEndIdx,
                   setIsEdit,
                   setIsMove,
                   setCurrRoomId,
                   setEditInitStartIdx,
                   setEditInitEndIdx,
                   updateMeeting
                 }) => {
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState('0');
  const [left, setLeftOffset] = useState('0px');
  const [startMouseX, setStartMouseX] = useState(null);
  const {start, end} = meeting;

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

  const calcDragUnitAmount = (clientX) => {
    let moveXPx = clientX - startMouseX;
    let unitAmount = parseInt(moveXPx / unitWidth + "");
    let modXPx = parseInt(moveXPx % unitWidth + "");
    if (Math.abs(modXPx) >= unitWidth / 2) {
      unitAmount += moveXPx < 0 ? -1 : 1;
    }
    return unitAmount;
  }

  const onDragEnd = (e) => {
    console.log("[onDragEnd]", currRoomId);
    if (isMove && !isEdit) {
      let unitAmount = calcDragUnitAmount(e.clientX);
      if (start + unitAmount >= 0 && end + unitAmount <= units.length) {
        updateMeeting({
          id: meeting.id,
          roomId: currRoomId,
          start: start + unitAmount,
          end: end + unitAmount
        });
      }
      setIsMove(false);
    }
    setOpacity(1);
  }

  const onDragOver = (e) => {
    console.log("[onDragOver]");
    if (!isEdit) return;

    let newEnd = currUnitIdx;
    if (e) {
      let movePx = e.clientX - startMouseX;
      newEnd = editInitEndIdx + parseInt(movePx / unitWidth + "") + 1;
    }
    newEnd = newEnd > units.length ? units.length : newEnd;
    newEnd = newEnd <= meeting.start + 1 ? meeting.start + 1 : newEnd;
    updateMeeting({id: meeting.id, end: newEnd});
  }

  const onEventMouseDown = () => {
    console.log("[onEventMouseDown]");
    setCurrRoomId(meeting.roomId);
  }

  const onEventMouseUp = () => {
    console.log("[onEventMouseUp]");
    setCurrRoomId(-1);
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
        display: isShow ? 'inline-block' : 'none',
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

export default Meeting;
