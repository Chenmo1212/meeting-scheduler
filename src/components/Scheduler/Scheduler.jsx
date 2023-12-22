import React, {useEffect, useRef, useState} from 'react';
import './Scheduler.css';
import Unit from "./Unit";
import Meeting from "./Meeting";


const onUnitMouseEnter = (roomIdx, unitIdx) => {
  // console.log(`[onUnitMouseEnter]: ${roomIdx}, ${unitIdx}`)
}

const Scheduler = ({rooms, units, meetings, setMeetings}) => {
  const [isSelecting, setSelecting] = useState(false);
  const [selectingRoomIdx, setSelectingRoomId] = useState(-1);
  const [currRoomId, setCurrRoomId] = useState(-1);
  const [currUnitIdx, setCurrUnitIdx] = useState(-1);

  const [isEdit, setIsEdit] = useState(false);
  const [editInitStartIdx, setEditInitStartIdx] = useState(-1);
  const [editInitEndIdx, setEditInitEndIdx] = useState(-1);

  const [isMove, setIsMove] = useState(false);

  const [unitWidth, setUnitWidth] = useState(0);

  const unitsRef = useRef(null);

  useEffect(() => {
    if (unitsRef.current) {
      setUnitWidth(unitsRef.current.getBoundingClientRect().width / units.length);
    }
  }, [units, unitsRef]);

  const onUnitMouseDown = (room, unitIdx) => {
    console.log(`[onUnitMouseDown]: ${room.id}, ${unitIdx}`);
    setSelecting(true);
    setSelectingRoomId(room.id);

    setMeetings([...meetings, {
      roomId: room.id,
      start: unitIdx,
      end: unitIdx + 1
    }]);
  }

  const onUnitMouseUp = (roomIdx, unitIdx) => {
    console.log(`[onUnitMouseUp]: ${roomIdx}, ${unitIdx}`);
    setSelecting(false);
  }

  const onUnitDragEnter = (room, unitIdx) => {
    console.log(`[onUnitDragEnter]: ${room.id}, ${unitIdx}`);
    setCurrRoomId(room.id);
    setCurrUnitIdx(unitIdx);
  }

  const updateMeeting = (meeting) => {
    const updatedMeetings = meetings.map(e => {
      if (meeting.isMove) {
        return {
          ...e,
          start: meeting.start,
          end: meeting.end,
          roomId: meeting.newRoomId
        }
      } else {
        return e.id === meeting.id ? meeting : e;
      }
    });
    setMeetings(updatedMeetings);
  }

  return (
    <div className="schedule">
      {rooms.map((room, roomIdx) => (
        <div className="room" key={roomIdx}>
          <div className="left">{`Room ${roomIdx + 1}`}</div>
          <div className="main" ref={unitsRef}>
            {units.map((unit, unitIdx) => (
              <Unit
                key={unitIdx}
                width={unitWidth}
                onUnitMouseDown={() => onUnitMouseDown(room, unitIdx)}
                onUnitMouseEnter={() => onUnitMouseEnter(room, unitIdx)}
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
                isEdit={isEdit}
                isMove={isMove}
                editInitStartIdx={editInitStartIdx}
                editInitEndIdx={editInitEndIdx}
                unitWidth={unitWidth}
                currRoomId={currRoomId}
                currUnitIdx={currUnitIdx}
                updateMeeting={updateMeeting}
                setIsEdit={setIsEdit}
                setIsMove={setIsMove}
                setCurrRoomId={setCurrRoomId}
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
