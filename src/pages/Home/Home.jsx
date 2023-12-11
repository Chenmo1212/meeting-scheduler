import React from 'react';
import './Home.css';
import {Button} from 'antd';

const MeetingRooms = () => {
    return (
        <div className="meeting-rooms" aria-label="Meeting Room List`">
            room list
            <Button type="primary">PRESS ME</Button>
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
