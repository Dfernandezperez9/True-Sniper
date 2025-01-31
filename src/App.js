import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import CountDown from './CountDown.js';
import Game from './Game.js';
import GameOver from './GameOver.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/countdown" element={<CountDown />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameover" element={<GameOver />} />
      </Routes>
    </Router>
  );
}

export default App;
