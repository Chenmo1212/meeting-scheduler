import React from 'react';
import './Scheduler.css';
import Unit from "./Unit";


const onUnitMouseDown = (roomIdx, unitIdx) => {
  console.log(`[onUnitMouseDown]: ${roomIdx}, ${unitIdx}`)
}
const onUnitMouseEnter = (roomIdx, unitIdx) => {
  console.log(`[onUnitMouseEnter]: ${roomIdx}, ${unitIdx}`)
}
const onUnitMouseUp = (roomIdx, unitIdx) => {
  console.log(`[onUnitMouseUp]: ${roomIdx}, ${unitIdx}`)
}
const onUnitDragEnter = (roomIdx, unitIdx) => {
  console.log(`[onUnitDragEnter]: ${roomIdx}, ${unitIdx}`)
}


const Scheduler = () => {
  const rooms = [1, 2, 3];
  const units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="schedule">
      {rooms.map((room, roomIdx) => (
        <div className="room" key={roomIdx}>
          <div className="left">{`Room ${roomIdx + 1}`}</div>
          <div className="main">
            {units.map((unit, unitIdx) => (
              <Unit
                key={unitIdx}
                width={100 / units.length + '%'}
                onUnitMouseDown={() => onUnitMouseDown(roomIdx, unitIdx)}
                onUnitMouseEnter={() => onUnitMouseEnter(roomIdx, unitIdx)}
                onUnitMouseUp={() => onUnitMouseUp(roomIdx, unitIdx)}
                onUnitDragEnter={() => onUnitDragEnter(roomIdx, unitIdx)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
