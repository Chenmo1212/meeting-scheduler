import React, {useState} from 'react';
import './MeetingRoomBooking.css';
import Scheduler from '../../components/Scheduler/Scheduler'

const ROOMS = [{id: 1}, {id: 2}, {id: 3}];
const UNITS_COUNT = 48;
const DEFAULT_MEETINGS = [{id: 1, roomId: 1, start: 5, end: 10}];

const MeetingRoomBooking = () => {
  const [meetings, setMeetings] = useState(DEFAULT_MEETINGS);
  return (
    <div className="home" aria-label="Meeting Room Booking Page">
      <div className="content">
        <Scheduler
          rooms={ROOMS}
          units={Array.from({length: UNITS_COUNT}, (_, index) => index + 1)}
          meetings={meetings}
          setMeetings={setMeetings}/>
      </div>
    </div>
  );
};

export default MeetingRoomBooking;
