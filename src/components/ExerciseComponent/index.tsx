import React, { useState, useEffect, useCallback } from 'react';

interface ExerciseProgram {
  name: string;
  steps: string[];
}

interface ExerciseProps {
  programs: {
    pushups: ExerciseProgram[];
    situps: ExerciseProgram[];
  };
}

const ExerciseComponent: React.FC<ExerciseProps> = ({ programs }) => {
  const [currentProgram, setCurrentProgram] = useState('pushups');
  const [currentSession, setCurrentSession] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [clockValue, setClockValue] = useState(0);

  const setProgram = (program: string) => {
    setCurrentProgram(program);
    setCurrentSession(0); // Reset session when changing program
  };

const setSession = useCallback((session: number) => {
  setCurrentSession(session);
  const program = programs[currentProgram as keyof typeof programs]?.[session];
  if (program) {
    setSteps(program.steps);
    setCurrentStep(0);
  }
}, [currentProgram, programs]);
  useEffect(() => {
    setSession(currentSession);
  }, [currentProgram, currentSession, setSession]);

  const handleGoButton = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSession(currentSession + 1);
    }
    setClockValue(0);
  };

  return (
    <div className='flex items-center justify-center bg-gray-800 opacity-95 h-screen w-screen'>
<div className='flex justify-center border-t-gray-800 w-4/6 h-5/6  rounded-lg bg-gray-600 bg-opacity-90 items-center content-center'>
  <div className='py-4  '>
    <div>
      <button className='h-10 w-10 rounded-full' onClick={() => setProgram('pushups')}>Pushups</button>
    </div>
    <div>
      <button className='h-10 w-10 rounded-full' onClick={() => setProgram('situps')}>Situps</button>
    </div>
  </div>
      <div className=' flex-col items-center content-center '>
    <h2>Current Program: {currentProgram}</h2>
    <h3>Current Session: {currentSession}</h3>
    {steps.map((step, index) => (
      <div key={index} className={`py-2 ${index <= currentStep ? 'text-green-500' : ''}`}>
        <h4>Step {index + 1}</h4>
        <p>{step}</p>
      </div>
    ))}
    <button onClick={handleGoButton}>Next Step</button>
  </div>
</div>
    </div>

  );
};

export default ExerciseComponent;
