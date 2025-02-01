import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
const apiUrl = process.env.REACT_APP_API_URL;



const Home = () => {
  const [topScores, setTopScores] = useState([]);
  const navigate = useNavigate();

  const fetchTopScores = async () => {
    try {
      const response = await fetch(`${apiUrl}/top-scores`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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
    navigate("/login");
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <h1 className="title">True Sniper</h1>
      </div>
      <div className="scoreboard-main-container">
        <div className="scoreboard-secondary-container">
          <h2 className="scoreboard-title">Top five scores</h2>
          <ol className="scoreboard-list">
            {topScores.map((gamer, index) => (
              <li key={index}>{gamer.nickname}: {gamer.score}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="shadow"></div>
      <div className="link-container" onClick={handleClick}>
        <span className="link">Play</span>
      </div>
      <div className="animated-reticle"></div>
    </div>
  );
}

export default Home;