import React, {useState} from 'react';
import './Scheduler.css';
import Unit from "./Unit";
import Event from "./Event";


const onUnitMouseEnter = (roomIdx, unitIdx) => {
  // console.log(`[onUnitMouseEnter]: ${roomIdx}, ${unitIdx}`)
}
const onUnitMouseUp = (roomIdx, unitIdx) => {
  // console.log(`[onUnitMouseUp]: ${roomIdx}, ${unitIdx}`)
}
const onUnitDragEnter = (roomIdx, unitIdx) => {
  // console.log(`[onUnitDragEnter]: ${roomIdx}, ${unitIdx}`)
}


const Scheduler = ({rooms, units, events, setEvents}) => {
  const [isSelecting, setSelecting] = useState(false);
  const [selectingRoomIdx, setSelectingRoomIdx] = useState(-1);

  const onUnitMouseDown = (roomIdx, unitIdx) => {
    console.log(`[onUnitMouseDown]: ${roomIdx}, ${unitIdx}`);
    setSelecting(true);
    setSelectingRoomIdx(roomIdx);

    setEvents([{
      start: unitIdx,
      end: unitIdx + 1
    }])

//       let addMinutes = (keyIndex - 1) * this.settingData.unit;
//       let addMinutes2 = keyIndex * this.settingData.unit;
//       let newStartDateObj = this.addMinutes(
//         new Date(this.settingData.startDate),
//         addMinutes
//       );
//       let newEndDateObj = this.addMinutes(
//         new Date(this.settingData.startDate),
//         addMinutes2
//       );
//       this.scheduleData[rowIndex].schedule.push({
//         text: "New",
//         start: this.datetimeFormatter(newStartDateObj),
//         end: this.datetimeFormatter(newEndDateObj)
//       });
//       this.isSelectingIndex =
//         this.scheduleData[this.isSelectingRowIndex].schedule.length - 1;
  }

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

            {events.map((event, eventIdx) => (
              <Event
                key={eventIdx}
                start={event.start}
                end={event.end}
                units={units}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
