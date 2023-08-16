import React, { useState, useEffect, useRef } from 'react';
import { pushupContent } from '../../pages/database';


const ExerciseComponent: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleGoButtonClick = () => {
    if (currentStepIndex < pushupContent[currentSession].steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setElapsedTime(0);
    } else {
      if (currentSession < pushupContent.length - 1) {
        setCurrentSession(currentSession + 1);
        setCurrentStepIndex(0);
        setElapsedTime(0);
      } else {
        // Implemente a lógica para finalizar o programa aqui
      }
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);

      if (
        pushupContent[currentSession].steps[currentStepIndex].includes('rest 60 seconds') &&
        elapsedTime === 59
      ) {
        setIsResting(true);
      } else {
        setIsResting(false);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSession, currentStepIndex, elapsedTime]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setElapsedTime(0);
  }, [currentSession]);

  return (
    <div className='trueblured'>
      <h1>Exercise Program</h1>

      <h2>Current Session: {currentSession}</h2>
      <div>
        <div
          style={{
            animation: isResting ? 'blink 1s step-end infinite' : 'none',
          }}
        >
          {pushupContent[currentSession].steps[currentStepIndex]}
        </div>
      </div>
      <div>Elapsed Time: {elapsedTime} seconds</div>
      <button onClick={handleGoButtonClick}>Go</button>
    </div>
  );
};

export default ExerciseComponent;
