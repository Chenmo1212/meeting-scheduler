import React, {useEffect, useState} from 'react';
import {message} from "antd"
import {UNEDITED, EDITED, EDITING} from './const'

const Meeting = ({
                   units,
                   meeting,
                   isActive,
                   isShow,
                   editMode,
                   isMove,
                   unitWidth,
                   currRoomId,
                   currUnitIdx,
                   editInitStartIdx,
                   editInitEndIdx,
                   isOverlapWithExistingMeetings,
                   getEditingTimeRange,
                   setEditMode,
                   setIsMove,
                   setCurrRoomId,
                   setActiveMeetingId,
                   setEditInitStartIdx,
                   setEditInitEndIdx,
                   updateMeeting
                 }) => {
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState('0');
  const [left, setLeftOffset] = useState('0px');
  const [startMouseX, setStartMouseX] = useState(null);
  const {start, end} = meeting;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setWidth((end - start) * unitWidth + "px");
    setLeftOffset(start * unitWidth + "px");
  }, [start, end, unitWidth]);

  useEffect(() => {
    if (editMode) onDragOver();
  }, [currUnitIdx])

  const displayWarningMessage = (msg) => {
    messageApi.open({
      type: 'warning',
      content: msg,
    });
  }

  const onDragStart = (e) => {
    if (!isActive) return;
    if (!editMode && e) {
      setIsMove(true);
      setOpacity(0.5);
      setStartMouseX(e.clientX);
    }
  }

  const onDragEnd = (e) => {
    if (!isActive) return;
    if (isMove && !editMode) {
      const unitAmount = calcDragUnitAmount(e.clientX);

      let newStart = meeting.start + unitAmount;
      let newEnd = meeting.end + unitAmount;
      if (newStart >= 0 && newEnd <= units.length) {
        const updatedMeeting = {
          id: meeting.id,
          roomId: currRoomId,
          start: newStart,
          end: newEnd
        }

        const isOverlap = isOverlapWithExistingMeetings(updatedMeeting)
        if (!isOverlap) updateMeeting(updatedMeeting);
        else displayWarningMessage("Meeting overlaps with existing meetings")
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
    if (!isActive) return
    if (e) e.preventDefault();

    let newStart = start;
    let newEnd = end;

    if (editMode === UNEDITED) return;
    else if (editMode === EDITING)
      newStart = calculateNewStart(e);
    else if (editMode === EDITED)
      newEnd = calculateNewEnd(e);

    updateMeeting({id: meeting.id, start: newStart, end: newEnd});
  };

  const calculateNewStart = (e) => {
    let newStart = currUnitIdx;
    if (e) {
      let movePx = e.clientX - startMouseX;
      newStart = editInitStartIdx + parseInt((movePx / unitWidth).toString()) - 1;
    }

    let range = getEditingTimeRange();
    newStart = newStart < range.start ? range.start : newStart;
    newStart = newStart > meeting.end - 1 ? meeting.end - 1 : newStart;
    return newStart;
  };

  const calculateNewEnd = (e) => {
    let newEnd = currUnitIdx;
    if (e) {
      let movePx = e.clientX - startMouseX;
      newEnd = editInitEndIdx + parseInt((movePx / unitWidth).toString());
    }

    let range = getEditingTimeRange();
    newEnd = newEnd > range.end ? range.end : newEnd;
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
    setActiveMeetingId(meeting.id);
  }

  const editStart = (e) => {
    setEditMode(1);
    editEventStart(e);
  }

  const editEnd = (e) => {
    setEditMode(2);
    editEventStart(e);
  }
  const editEventStart = (e) => {
    setStartMouseX(e.clientX);
    setEditInitStartIdx(start);
    setEditInitEndIdx(end);
    setOpacity(1);
  }

  const resetEditConfig = () => {
    setStartMouseX(null);
    setEditInitStartIdx(-1);
    setEditInitEndIdx(-1);
    setEditMode(0);
    setOpacity(1);
  }

  const getMeetingStatus = () => {
    let className = "meeting "
    if (isActive) className += "active"
    else if (isShow) className += "occupied"
    return className
  }

  return (
    <div
      className={getMeetingStatus()}
      style={{
        display: isShow ? 'inline-block' : 'none', width: width,
        left: left, opacity: opacity,
        height: '100%'
      }}
      draggable={isActive}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e)}
      onMouseDown={onEventMouseDown}
      onMouseUp={onEventMouseUp}
      onClick={onEventClick}
    >
      {contextHolder}
      {meeting.id}
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
