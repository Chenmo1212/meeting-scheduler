import React, {useEffect, useRef, useState} from 'react';
import './Scheduler.css';
import Unit from "./Unit";
import Meeting from "./Meeting";
import {UNEDITED} from "./const"

const Scheduler = ({rooms, units, meetings, setMeetings}) => {
  const [currRoomId, setCurrRoomId] = useState(-1);
  const [currUnitIdx, setCurrUnitIdx] = useState(-1);
  const [activeMeetingId, setActiveMeetingId] = useState(-1);

  const [editMode, setEditMode] = useState(UNEDITED);
  const [editInitStartIdx, setEditInitStartIdx] = useState(-1);
  const [editInitEndIdx, setEditInitEndIdx] = useState(-1);

  const [isMove, setIsMove] = useState(false);

  const [unitWidth, setUnitWidth] = useState(0);
  const [unitLabels, setUnitLabels] = useState([]);
  const unitsRef = useRef(null);

  useEffect(() => {
    if (unitsRef.current) {
      setUnitWidth(unitsRef.current.getBoundingClientRect().width / units.length);
      setUnitLabels(getLabels());
    }
  }, [units, unitsRef]);

  const getLabels = () => {
    let res = units.map((unit, idx) => idx % 2 === 0 ? idx / 2 + ":00" : '')
    res.push("0:00");
    return res;
  }

  const onUnitMouseDown = (room, unitIdx) => {
    setMeetings([...meetings, {
      id: meetings.length + 1,
      roomId: room.id,
      start: unitIdx,
      end: unitIdx + 1
    }]);
    setActiveMeetingId(meetings.length + 1);
  }

  const onUnitMouseUp = (roomIdx, unitIdx) => {
    setActiveMeetingId(-1);
  }

  const onUnitDragEnter = (room, unitIdx) => {
    setCurrRoomId(room.id);
    setCurrUnitIdx(unitIdx);
  }

  const updateMeeting = (meeting) => {
    const updatedMeetings = meetings.map(e => {
      return e.id === meeting.id ? {...e, ...meeting} : e;
    });
    setMeetings(updatedMeetings);
  }

  const getEditingTimeRange = (meeting) => {
    const filteredMeetings = meetings.filter(e => e.roomId === meeting.roomId);
    const sortedMeetings = filteredMeetings.slice().sort((a, b) => a.start - b.start);
    const index = sortedMeetings.findIndex(m => m.id === meeting.id);
    if (index === -1) return {start: 0, end: units.length - 1}

    const previousMeeting = sortedMeetings[index - 1];
    const nextMeeting = sortedMeetings[index + 1];

    const start = previousMeeting ? previousMeeting.end : 0;
    const end = nextMeeting ? nextMeeting.start : units.length - 1;

    return {start, end};
  }

  const isOverlapWithExistingMeetings = (newMeeting) => {
    const {id, roomId, start, end} = newMeeting;
    const filteredMeetings = meetings.filter(meeting => meeting.roomId === roomId && meeting.id !== id);
    for (const meeting of filteredMeetings) {
      if (start < meeting.end && end > meeting.start) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="schedule">
      <div className="unit-label">
        <div className="left"/>
        <div className="labels">
          {unitLabels.map((label, unitIdx) => (
            <div key={unitIdx} style={{"width": unitWidth + "px"}}>{label}</div>
          ))}
        </div>
      </div>

      {rooms.map((room, roomIdx) => (
        <div className="room" key={roomIdx}>
          <div className="left">{`Room ${roomIdx + 1}`}</div>
          <div className="main" ref={unitsRef}>
            {units.map((unit, unitIdx) => (
              <Unit
                key={unitIdx}
                width={unitWidth}
                onUnitMouseDown={() => onUnitMouseDown(room, unitIdx)}
                onUnitMouseUp={() => onUnitMouseUp(room, unitIdx)}
                onUnitDragEnter={() => onUnitDragEnter(room, unitIdx)}
              />
            ))}

            {meetings.map((meeting, meetingIdx) => (
              <Meeting
                key={meetingIdx}
                units={units}
                meeting={meeting}
                isShow={meeting.roomId === room.id}
                isActive={activeMeetingId === meeting.id}
                editMode={editMode}
                isMove={isMove}
                editInitStartIdx={editInitStartIdx}
                editInitEndIdx={editInitEndIdx}
                unitWidth={unitWidth}
                currRoomId={currRoomId}
                currUnitIdx={currUnitIdx}
                updateMeeting={updateMeeting}
                isOverlapWithExistingMeetings={(newMeeting) => isOverlapWithExistingMeetings(newMeeting)}
                getEditingTimeRange={() => getEditingTimeRange(meeting)}
                setEditMode={setEditMode}
                setIsMove={setIsMove}
                setCurrRoomId={setCurrRoomId}
                setActiveMeetingId={setActiveMeetingId}
                setEditInitStartIdx={setEditInitStartIdx}
                setEditInitEndIdx={setEditInitEndIdx}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
