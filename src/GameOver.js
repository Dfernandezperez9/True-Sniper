import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import "./GameOver.css";
const apiUrl = process.env.REACT_APP_API_URL;

const GameOver = () => {
  const [topScores, setTopScores] = useState([]);
  const { nickname, level, points } = useUser();
  const navigate = useNavigate();

  const fetchTopScores = async () => {
    try {
      const response = await fetch(`${apiUrl}/top-scores`);
      const data = await response.json();
      setTopScores(data);
    } catch (error) {
      console.error('Error fetching top scores:', error);
    }
  };

  useEffect(() => {
    fetchTopScores();
  }, []);

  const handleClick = () => {
    navigate("/");
  }

  const handleRestart = () => {
    navigate("/countdown");
  }

  return (
    <div className="gameOver-main-container">
      <div className="gameOver-title-container">
        <h1 className="gameOver-title">Game Over</h1>
      </div>
      <div className="gameOver-yourScore-container">
        {nickname && level && points ? (
          <>
            <h2 className="gameOver-scoreboard-greeting">Congratulations {nickname}!!</h2>
            <h2 className="gameOver-scoreboard-greeting">You reached level {level} and scored {points} points!!</h2>
          </>
        ) : (
          <h2 className="gameOver-scoreboard-greeting">Loading your score...</h2>
        )}
      </div>
      <div className="gameOver-scoreboard-main-container">
        <div className="gameOver-scoreboard-secondary-container">
          <h2 className="gameOver-scoreboard-title">Top five scores</h2>
          <ol className="gameOver-scoreboard-list">
            {topScores.map((gamer, index) => (
              <li key={index}>{gamer.nickname}: {gamer.score}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="gameOver-link-container1">
        <span className="gameOver-back" onClick={handleClick} onMouseOver={() => { const elem = document.querySelector(".gameOver-back-text"); elem.classList.add("gameOver-vanishBack"); elem.classList.remove("gameOver-vanish");}} onMouseOut={() => { const elem = document.querySelector(".gameOver-back-text"); elem.classList.add("gameOver-vanish"); elem.classList.remove("gameOver-vanishBack");}}>🔙</span> <span className="gameOver-back-text">Back to home...</span>
      </div>
      <div className="gameOver-link-container2">
        <span className="gameOver-restart" onClick={handleRestart} onMouseOver={() => { const elem = document.querySelector(".gameOver-restart-text"); elem.classList.add("gameOver-vanishBack"); elem.classList.remove("gameOver-vanish");}} onMouseOut={() => { const elem = document.querySelector(".gameOver-restart-text"); elem.classList.add("gameOver-vanish"); elem.classList.remove("gameOver-vanishBack");}}>🔄</span> <span className="gameOver-restart-text">Try again...</span>
      </div>
    </div>
  )
};

export default GameOver;