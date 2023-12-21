import React, {useState} from 'react';
import './Timeline.css';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

const Timeline = () => {
    const [selectedSlots, setSelectedSlots] = useState([]);

    const handleSlotClick = (slot) => {
        if (selectedSlots.includes(slot)) {
            const newSelectedSlots = selectedSlots.filter((selectedSlot) => selectedSlot !== slot);
            setSelectedSlots(newSelectedSlots);
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;


        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const newSelectedSlots = [...selectedSlots];
        const [removed] = newSelectedSlots.splice(startIndex, 1);
        newSelectedSlots.splice(endIndex, 0, removed);

        setSelectedSlots(newSelectedSlots);
    };

    const renderDraggableSlot = (i) => (
        <Draggable key={`slot-${i}`} draggableId={`slot-${i}`} index={i}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`selection-highlight ${snapshot.isDragging ? 'dragging' : ''}`}
                />
            )}
        </Draggable>
    );

    const renderTimeSlots = () => {
        const slots = [];

        for (let i = 0; i < 48; i++) {
            const label = `${i / 2}:00`; // 使用Math.floor确保得到整数
            const isSelected = selectedSlots.includes(i);
            const isFirstSlot = i % 24 === 0;

            slots.push(
                <div
                    key={label}
                    className={`time-slot ${isFirstSlot ? 'first-slot' : ''}`}
                    onClick={() => handleSlotClick(i)}
                >
                    {isSelected && renderDraggableSlot(i)}
                    {i === 0 && <div className="hour-label">{label}</div>}
                    {i % 2 === 0 && i !== 0 && <div className="hour-label">{label}</div>}
                </div>
            );
        }

        return slots;
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="timeline" direction="horizontal">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="timeline">
                        {renderTimeSlots()}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Timeline;
