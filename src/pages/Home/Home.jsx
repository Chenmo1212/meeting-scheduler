import React, {useState} from 'react';
import './Home.css';
import Scheduler from '../../components/Scheduler/Scheduler'

const Home = () => {
  const rooms = [{id: 1}, {id: 2}, {id: 3}]
  const units = Array.from({length: 48}, (_, index) => index + 1);
  const [meetings, setMeetings] = useState([{
    id: 1, roomId: 1, start: 5, end: 10,
  }]);

  return (
    <div className="home" aria-label="Meeting Room Booking Page">
      <div className="content">
        <Scheduler
          rooms={rooms}
          units={units}
          meetings={meetings}
          setMeetings={setMeetings}
        />
      </div>
    </div>
  );
};

export default Home;
