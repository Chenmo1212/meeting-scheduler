import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
      <div className="App">
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
  );
}

export default App;