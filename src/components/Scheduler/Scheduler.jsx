import React, {useEffect, useRef, useState} from 'react';
import './Scheduler.css';
import Unit from "./Unit";
import Event from "./Event";


const onUnitMouseEnter = (roomIdx, unitIdx) => {
  // console.log(`[onUnitMouseEnter]: ${roomIdx}, ${unitIdx}`)
}

const Scheduler = ({rooms, units, events, setEvents}) => {
  const [isSelecting, setSelecting] = useState(false);
  const [selectingRoomIdx, setSelectingRoomIdx] = useState(-1);
  const [currRoomIdx, setCurrRoomIdx] = useState(-1);
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

  const onUnitMouseDown = (roomIdx, unitIdx) => {
    console.log(`[onUnitMouseDown]: ${roomIdx}, ${unitIdx}`);
    setSelecting(true);
    setSelectingRoomIdx(roomIdx);

    setEvents([{
      start: unitIdx,
      end: unitIdx + 1
    }])
  }

  const onUnitMouseUp = (roomIdx, unitIdx) => {
    console.log(`[onUnitMouseUp]: ${roomIdx}, ${unitIdx}`);
    setSelecting(false);
  }

  const onUnitDragEnter = (roomIdx, unitIdx) => {
    console.log(`[onUnitDragEnter]: ${roomIdx}, ${unitIdx}`);
    setCurrRoomIdx(roomIdx);
    setCurrUnitIdx(unitIdx);
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
                onUnitMouseDown={() => onUnitMouseDown(roomIdx, unitIdx)}
                onUnitMouseEnter={() => onUnitMouseEnter(roomIdx, unitIdx)}
                onUnitMouseUp={() => onUnitMouseUp(roomIdx, unitIdx)}
                onUnitDragEnter={() => onUnitDragEnter(roomIdx, unitIdx)}
              />
            ))}

            {events.map((event, eventIdx) => (
              <Event
                key={eventIdx}
                start={event.start}
                end={event.end}
                units={units}
                isEdit={isEdit}
                isMove={isMove}
                editInitStartIdx={editInitStartIdx}
                editInitEndIdx={editInitEndIdx}
                unitWidth={unitWidth}
                currRoomIdx={currRoomIdx}
                currUnitIdx={currUnitIdx}
                setEvents={setEvents}
                setIsEdit={setIsEdit}
                setIsMove={setIsMove}
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
