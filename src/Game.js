import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "./userContext";
import "./Game.css";
const apiUrl = process.env.REACT_APP_API_URL;

const Game = () => {
  const [elements, setElements] = useState([]);
  const [fontSize, setFontSize] = useState(5);
  const [counter, setCounter] = useState(0);
  const [showLevel, setShowLevel] = useState(true);
  const [timer, setTimer] = useState(1000);
  const [showFail, setShowFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [failPosition, setFailPosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const timerRef = useRef(timer);
  const navigate = useNavigate();
  const { nickname, level, setLevel, points, setPoints } = useUser();
  const failMessages = [
    "-100!!",
    "Woo haa!!",
    "Toastee!!",
    "Miss!!",
    "Nope!!",
    "Fail!!",
    "LoL!!",
    "Close!!",
    "Uhh!!",
    "You suck!!",
    "Water!!"
  ];

  useEffect(() => {
    setPoints(0);
  }, [setPoints]);

  const saveScore = useCallback(async () => {
    try {
      await fetch(`${apiUrl}/save-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: nickname, level: level, score: points }),
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  }, [nickname, points, level]);

  const addElement = useCallback(() => {
    const newElement = {
      id: Date.now(),
      x: Math.random() * 85,
      y: Math.random() * 85
    };
    setElements((prevElements) => [...prevElements, newElement]);
  }, []);

  const removeElement = (id) => {
    setElements((prevElements) => prevElements.filter((element) => element.id !== id));
    setCounter((prevCounter) => prevCounter + 1);

    if ((counter === 50 && fontSize > 1 && timer > 100) || (counter === 150 && fontSize > 1 && timer > 100) || (counter === 250 && fontSize > 1 && timer > 100) || (counter === 350 && fontSize > 1 && timer > 100) || (counter === 450 && fontSize > 1 && timer > 100) || (counter === 550 && fontSize > 1 && timer > 100) || (counter === 650 && fontSize > 1 && timer > 100) || (counter === 750 && fontSize > 1 && timer > 100) || (counter === 850 && fontSize > 1 && timer > 100)) {
      setLevel((prevLevel) => prevLevel + 1);
      setFontSize((prevFontSize) => prevFontSize - 0.5);
      setTimer((prevTimer) => prevTimer - 100);
    }
    setPoints((prevPoints) => prevPoints + 25);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.element')) {
      setPoints((prevPoints) => prevPoints - 100);
      setFailMessage(failMessages[Math.floor(Math.random() * failMessages.length)]);
      setFailPosition(mousePosition);
      setShowFail(true);
    }
  };

  useEffect(() => {
    if (level > 1) {
      setShowLevel(true);
    }
  }, [level]);

  useEffect(() => {
    if (showLevel) {
      const levelTimer = setTimeout(() => {
        setShowLevel(false);
      }, 3000);
      return () => clearTimeout(levelTimer);
    }
  }, [showLevel]);

  useEffect(() => {
    if (showFail) {
      const failTimer = setTimeout(() => {
        setShowFail(false);
      }, 500);

      return () => clearTimeout(failTimer);
    }
  }, [showFail]);

  useEffect(() => {
    if (showFail) {
      const failContainer = document.querySelector('.fail-container');
      if (failContainer) {
        failContainer.style.left = `${failPosition.x}px`;
        failContainer.style.top = `${failPosition.y}px`;
      }
    }
  }, [showFail, failPosition]);

  useEffect(() => {
    if (elements.length < 50 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        addElement();
      }, timer);
    }
    return () => {
      if (elements.length === 50) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        saveScore();
        navigate('/gameover');
      }
    };
  }, [addElement, elements.length, timer, navigate, saveScore]);

  useEffect(() => {
    if (timer !== timerRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        addElement();
      }, timer);
      timerRef.current = timer;
    }
  }, [timer, addElement]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App" onClick={handleClickOutside}>
      <h1 className="score-title">Score: {points}</h1>
      {showLevel && (
        <div className="level-container">
          <h1>Level: {level}!</h1>
        </div>
      )}
      {showFail && (
        <div className="fail-container">
          <h1 className="fail-message">{failMessage}</h1>
        </div>
      )}
      {elements.map((element) => (
        <div className="element" key={element.id} style={{ position: 'absolute', left: `${element.x}%`, top: `${element.y}%`, transition: 'opacity 0.5s', opacity: 1, fontSize: `${fontSize}rem` }} onClick={() => removeElement(element.id)} >
          🎯
        </div>
      ))}
    </div>
  );
}

export default Game;