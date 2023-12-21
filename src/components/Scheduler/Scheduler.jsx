import React from 'react';
import './Scheduler.css';

const Scheduler = () => {
  const rooms = [1, 2, 3]
  return (
    <div className="schedule">
      {rooms.map((room, index) => (
        <div className="room">
          <div className="left">{`Room ${index + 1}`}</div>
          <div className="main">111</div>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
