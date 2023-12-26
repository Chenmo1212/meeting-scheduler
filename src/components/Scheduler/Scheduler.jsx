import React, {useEffect, useRef, useState} from 'react';
import './Scheduler.css';
import Unit from "./Unit";
import Meeting from "./Meeting";


const onUnitMouseEnter = (roomIdx, unitIdx) => {
  console.log(`[onUnitMouseEnter]: ${roomIdx}, ${unitIdx}`)
}

const Scheduler = ({rooms, units, meetings, setMeetings}) => {
  const [isSelecting, setSelecting] = useState(false);
  const [currRoomId, setCurrRoomId] = useState(-1);
  const [currUnitIdx, setCurrUnitIdx] = useState(-1);

  const [editMode, setEditMode] = useState(0);  // todo: 0: unedited, 1: edit start, 2: edit end
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
    console.log(`[onUnitMouseDown]: ${room.id}, ${unitIdx}`);
    setSelecting(true);

    setMeetings([...meetings, {
      id: meetings.length + 1,
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
      return e.id === meeting.id ? {...e, ...meeting} : e;
    });
    setMeetings(updatedMeetings);
  }

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
                isSelecting={isSelecting}
                editMode={editMode}
                isMove={isMove}
                editInitStartIdx={editInitStartIdx}
                editInitEndIdx={editInitEndIdx}
                unitWidth={unitWidth}
                currRoomId={currRoomId}
                currUnitIdx={currUnitIdx}
                updateMeeting={updateMeeting}
                setEditMode={setEditMode}
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
