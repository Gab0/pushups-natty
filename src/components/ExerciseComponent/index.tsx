import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { setActive } from '../../app/currentAction'

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
	const [stepStage, setStepStage] = useState<string[]>([]);
	const [currentStep, setCurrentStep] = useState(0);

	const setProgram = (program: string) => {
		setCurrentProgram(program);
		setCurrentSession(0); // Reset session when changing program
	};

	const dispatch = useDispatch();

	const setSession = useCallback(
		(session: number) => {
			setCurrentSession(session);

			const program = programs[currentProgram as keyof typeof programs]?.[session];
			if (program) {
				setSteps(program.steps);
				setCurrentStep(0);
				setStepStage(program.steps.map(() => 'transparent'));
			}
		},
		[currentProgram, programs],
	);

	useEffect(() => {
		setSession(currentSession);
	}, [currentSession, setSession]);

	const handleGoButton = () => {
		if (currentStep < steps.length - 1) {
			const updatedStages = [...stepStage];
			if (updatedStages[currentStep] === 'transparent') {
				updatedStages[currentStep] = 'pink';
			}
			setStepStage(updatedStages);
			setCurrentStep(currentStep + 1);

			// Update the activity switch;
			dispatch(setActive(currentStep % 2 === 1));
		} else {
			setSession(currentSession + 1);
		}
	};

	return (
		<div className='container bg-transparent flex items-center justify-center'>
			<div className='container w-5/6 h-5/6 flex flex-col items-center justify-center rounded-3xl'>
				<div className='container flex justify-center gap-20 py-1'>
					<button
						className={`w-20 h-auto text-zinc-50 outline outline-offset-1 border border-transparent rounded-full hover:border-black ${
							currentProgram === 'pushups'
								? 'bg-slate-600 text-neutral-50'
								: 'bg-slate-800 hover:bg-slate-600 hover:text-neutral-50'
						}`}
						onClick={() => setProgram('pushups')}
					>
						Pushups
					</button>
					<button
						className={`w-20 h-auto text-zinc-50 outline outline-offset-1 border border-transparent rounded-full hover:border-black ${
							currentProgram === 'situps'
								? 'bg-slate-600 text-neutral-50'
								: 'bg-slate-800 hover:bg-slate-600 hover:text-neutral-50'
						}`}
						onClick={() => setProgram('situps')}
					>
						Situps
					</button>
				</div>
				<div className='w-10/12 rounded-full flex flex-col justify-center items-center content-center'>
					<h2 className='text-zinc-50'>Current Program: {currentProgram}</h2>
					<h3 className='text-zinc-50'>Current Session: {currentSession}</h3>
					<div className='flex flex-col gap-2 items-center'>
						{steps.map((step, index) => (
							<div
								key={index}
								className={`${
									stepStage[index] === 'pink'
										? 'flex flex-col items-center text-zinc-50 bg-gray-500 rounded-full w-52'
										: index === currentStep
										? 'flex flex-col items-center text-green-500 bg-pink-500 rounded-full w-52'
										: 'flex flex-col items-center text-zinc-50 bg-transparent w-auto'
								}`}
							>
								<div>
									<h4 className='text-zinc-50 text'>Step {index + 1}</h4>
								</div>
								<div>
									<p>{step}</p>
								</div>
							</div>
						))}
					</div>
					<div className='mx-auto py-2'>
						<button
							className='w-20 h-auto text-zinc-50 outline outline-offset-1 border border-transparent rounded-full hover:border-black hover:bg-slate-600 hover:text-neutral-50'
							onClick={handleGoButton}
						>
							Next Step
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExerciseComponent;
