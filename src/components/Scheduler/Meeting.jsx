import React, {useEffect, useState} from 'react';

const Meeting = ({
                   units,
                   meeting,
                   isShow,
                   editMode,
                   isMove,
                   unitWidth,
                   currRoomId,
                   currUnitIdx,
                   editInitStartIdx,
                   editInitEndIdx,
                   setEditMode,
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
    if (editMode) onDragOver();
  }, [currUnitIdx])

  const onDragStart = (e) => {
    console.log("[onDragStart]");
    if (!editMode && e) {
      setIsMove(true);
      setOpacity(0.5);
      setStartMouseX(e.clientX);
    }
  }

  const onDragEnd = (e) => {
    if (isMove && !editMode) {
      const unitAmount = calcDragUnitAmount(e.clientX);
      if (meeting.start + unitAmount >= 0 && meeting.end + unitAmount <= units.length) {
        updateMeeting({
          id: meeting.id,
          roomId: currRoomId,
          start: meeting.start + unitAmount,
          end: meeting.end + unitAmount,
        });
      }
      setIsMove(false);
    }
    setOpacity(1);
  };

  const calcDragUnitAmount = (clientX) => {
    let moveXPx = clientX - startMouseX;
    let unitAmount = parseInt(moveXPx / unitWidth + "");
    let modXPx = parseInt(moveXPx % unitWidth + "");
    if (Math.abs(modXPx) >= unitWidth / 2) {
      unitAmount += moveXPx < 0 ? -1 : 1;
    }
    return unitAmount;
  }

  const onDragOver = (e) => {
    console.log("[onDragOver]", editMode, e)
    if (e) e.preventDefault();

    let newStart = start;
    let newEnd = end;

    if (editMode === 0) return;
    else if (editMode === 1)
      newStart = calculateNewStart(e);
    else if (editMode === 2)
      newEnd = calculateNewEnd(e);

    updateMeeting({id: meeting.id, start: newStart, end: newEnd});
  };

  const calculateNewStart = (e) => {
    let newStart = currUnitIdx;
    if (e) {
      let movePx = e.clientX - startMouseX;
      newStart = editInitStartIdx + parseInt((movePx / unitWidth).toString()) - 1;
    }

    newStart = newStart < 0 ? 0 : newStart;
    newStart = newStart > meeting.end - 1 ? meeting.end - 1 : newStart;
    return newStart;
  };

  const calculateNewEnd = (e) => {
    console.log('currUnitIdx', currUnitIdx)
    let newEnd = currUnitIdx;
    if (e) {
      let movePx = e.clientX - startMouseX;
      newEnd = editInitEndIdx + parseInt((movePx / unitWidth).toString());
    }
    newEnd = newEnd > units.length ? units.length : newEnd;
    newEnd = newEnd <= meeting.start + 1 ? meeting.start + 1 : newEnd;
    return newEnd;
  };

  const onEventMouseDown = () => {
    setCurrRoomId(meeting.roomId);
  }

  const onEventMouseUp = () => {
    setCurrRoomId(-1);
  }

  const onEventClick = () => {
    console.log("[onEventClick]");
  }

  const editStart = (e) => {
    console.log('[editStart]')
    setEditMode(1);
    editEventStart(e);
  }

  const editEnd = (e) => {
    console.log("[editEnd]");
    setEditMode(2);
    editEventStart(e);
  }
  const editEventStart = (e) => {
    console.log("[editEventStart]", e.clientX);
    setStartMouseX(e.clientX);
    setEditInitStartIdx(start);
    setEditInitEndIdx(end);
    setOpacity(1);
  }

  const resetEditConfig = () => {
    console.log("[editEventEnd]");
    setStartMouseX(null);
    setEditInitStartIdx(-1);
    setEditInitEndIdx(-1);
    setEditMode(0);
    setOpacity(1);
  }

  return (
    <div
      className={'meeting'}
      style={{
        display: isShow ? 'inline-block' : 'none', width: width,
        left: left, opacity: opacity,
        height: '100%'
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e)}
      onMouseDown={onEventMouseDown}
      onMouseUp={onEventMouseUp}
      onClick={onEventClick}
    >
      <div
        className="resizable-e resizable-left"
        draggable={true}
        onDragStart={editStart}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnd={resetEditConfig}
      />
      <div
        className="resizable-e resizable-right"
        draggable={true}
        onDragStart={editEnd}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnd={resetEditConfig}
      />
    </div>
  );
};

export default Meeting;
