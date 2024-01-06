# React Meeting Scheduler

<p>
    <a href="https://github.com/Chenmo1212/meeting-booking-component" target="_blank">
        <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/Chenmo1212/meeting-booking-component">
    </a>
    <a href="https://github.com/Chenmo1212/meeting-booking-component/issues" target="_blank">
        <img alt="Issues" src="https://img.shields.io/github/issues/Chenmo1212/meeting-booking-component" />
    </a>
    <a href="https://github.com/Chenmo1212/meeting-booking-component/pulls" target="_blank">
        <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Chenmo1212/meeting-booking-component" />
    </a>
    <a href="/"><img src="https://komarev.com/ghpvc/?username=chenmo1212-meeting-booking-component&label=Visitors&base=200" alt="Visitor" /></a>
    <a href="https://github.com/Chenmo1212/meeting-booking-component" target="_blank">
        <img alt="GitHub" src="https://img.shields.io/github/license/Chenmo1212/meeting-booking-component">
    </a>
<br/>
<br/>
    <a href="https://github.com/Chenmo1212/meeting-booking-component" target="_blank">
        <img alt="GitHub followers" src="https://img.shields.io/github/followers/pudongping?style=social">
    </a>
    <a href="https://github.com/Chenmo1212/meeting-booking-component" target="_blank">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/Chenmo1212/meeting-booking-component?style=social">
    </a>
    <a href="https://github.com/Chenmo1212/meeting-booking-component" target="_blank">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/Chenmo1212/meeting-booking-component?style=social">
    </a>
    <a href="https://github.com/Chenmo1212/meeting-booking-component" target="_blank">
        <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/Chenmo1212/meeting-booking-component?style=social">
    </a>
</p>

![Snipaste_2024-01-06_08-02-52.png](images%2FSnipaste_2024-01-06_08-02-52.png)

A simple React application for scheduling and managing meetings in different rooms.

## Overview

This React Meeting Scheduler application allows users to schedule and manage meetings within various rooms. It provides an interactive interface for adding, dragging, and resizing meetings on a timeline.

## Features

- **Room Management:** Define different rooms for scheduling meetings.
- **Timeline View:** Visualize meetings on a timeline for each room.
- **Meeting Interaction:** Drag and drop meetings, resize them, and interact with the timeline.
- **Visual Feedback:** Meetings are color-coded and provide visual feedback based on their status.

## Components

### 1. Scheduler Component

The main component that integrates room, unit, and meeting components to create a cohesive scheduling view.

### 2. Meeting Component

Handles the display, interaction, and editing of individual meetings on the timeline.

### 3. Unit Component

Represents the time units on the timeline where meetings can be scheduled.

## Getting Started
1. Clone the repository:

   ```cmd
   git clone https://github.com/Chenmo1212/meeting-booking-component.git
   ```

2. Navigate to the project directory:

   ```cmd
   cd react-meeting-scheduler
   ```

3. Install dependencies:

   ```cmd 
   npm install
   ```

4. Start the development server:
   ```cmd
   npm start
   ```

5. Open the application in your browser

    http://localhost:3000

## Usage

- **Adding Meetings**: Click on a unit in the timeline to add a meeting for the selected room.
- **Moving Meetings**: Drag meetings to reschedule them within the timeline.
- **Resizing Meetings**: Drag the edges of meetings to adjust their duration.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you find a bug or have a suggestion for a new feature.

## License
This project is licensed under the MIT License.
