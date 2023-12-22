import React, {useEffect, useState} from 'react';
import './Home.css';
import {Card, Image} from 'antd';
import Timeline from "../../components/Timeline/Timeline"
import Scheduler from '../../components/Scheduler/Scheduler'

const RoomCover = () => {
  return (
    <div className="room-cover">
      <Image
        width={100}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </div>
  )
}

const MeetingRoom = () => {
  const [seats] = useState(0)

  const displaySeatText = (seatsCount) => {
    if (seatsCount <= 1) return seatsCount + " Seat";
    else return seatsCount + " Seats";
  }

  return (
    <div>
      <Card className="meeting-room"
            title={displaySeatText(seats)}
            bordered={true}>
        <div className="room-content">
          <RoomCover/>
          <Timeline/>
        </div>
      </Card>
    </div>
  )
}

const MeetingRooms = () => {
  return (
    <div className="meeting-rooms" aria-label="Meeting Room List`">
      <MeetingRoom/>
      <MeetingRoom/>
      <MeetingRoom/>
    </div>
  )
};

const MeetingDetails = () => {
  return (
    <div className="meeting-details" aria-label="Meeting Details">
      details
    </div>
  )
};

const Home = () => {
  const rooms = [{id: 1}, {id: 2}, {id: 3}]
  const units = Array.from({length: 24}, (_, index) => index + 1);
  const [meetings, setMeetings] = useState([{
    roomId: 1, start: 2, end: 7,
  }]);
  useEffect(() => {
    console.log('meetings: ', meetings);
  }, [meetings])

  return (
    <div className="home" aria-label="Meeting Room Booking Page">
      <div className="content">
        {/*<MeetingRooms/>*/}
        {/*<MeetingDetails/>*/}
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
