import React, {useState} from 'react';
import './Timeline.css'; // 导入样式文件

const Timeline = () => {
    // State to track the selected time slot
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Function to handle slot selection
    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    // Render time slots for a 12-hour period
    const renderTimeSlots = () => {
        const slots = [];

        for (let i = 0; i < 48; i++) {
            const label = `${i / 2}:00`;
            const isSelected = selectedSlot === i;
            const isFirstSlot = i % 24 === 0;

            slots.push(
                <div
                    key={i}
                    className={`time-slot${isFirstSlot ? ' first-slot' : ''}${isSelected ? ' selected' : ''}`}
                    onClick={() => handleSlotClick(i)}
                >
                    {i === 0 && <div className="hour-label">{label}</div>}
                    {i % 2 === 0 && i !== 0 && <div className="hour-label">{label}</div>}
                </div>
            );
        }

        return slots;
    };

    return <div className="timeline">{renderTimeSlots()}</div>;
};

export default Timeline;
