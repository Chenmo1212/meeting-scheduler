import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  return (
      <div className="App">
        <Header />
        <main>
          <Home />
        </main>
      </div>
  );
}

export default App;