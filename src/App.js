import './App.css';
import Header from './components/Header/Header';
import MeetingRoomBooking from './pages/MeetingRoomBookingPage/MeetingRoomBooking';

function App() {
  return (
      <div className="App">
        <Header />
        <main>
          <MeetingRoomBooking />
        </main>
      </div>
  );
}

export default App;