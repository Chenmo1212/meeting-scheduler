import React, {useState} from 'react';
import './Home.css';
import {Card, Image} from 'antd';
import Timeline from "../../components/Timeline/Timeline"


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
                    <Timeline />
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
    return (
        <div className="home" aria-label="Meeting Room Booking Page">
            <div className="content">
                <MeetingRooms/>
                <MeetingDetails/>
            </div>
        </div>
    );
};

export default Home;
