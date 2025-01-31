import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CountDown.css";

const Countdown = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate('/game');
    }
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown, navigate]);

  return (
    <div className="countdown-container">
        <div className ="countdown-title">
          <h1>Ready Up!</h1>
        </div>
      <div className="countdown-text">
        {countdown}
      </div>
    </div>
  );
}

export default Countdown;