import React from "react";
import ExerciseComponent from '../components/ExerciseComponent';

import MascotModel from "../components/ActionViewer";
import { Canvas } from "@react-three/fiber";

import store from '../app/store';
import { Provider } from 'react-redux';

function Index(): React.JSX.Element {
	const programs = {
		pushups: [
			{
				name: 'w3t1d1',
				steps: [
					'do 15 pushups',
					'rest 60 seconds',
					'do 18 pushups',
					'rest 60 seconds',
					'do 11 pushups',
					'rest 60 seconds',
					'do 11 pushups',
					'rest 60 seconds',
					'do at least 14 pushups',
					'done!',
				],
			},
			{
				name: 'w3t1d2',
				steps: [
					'do 15 pushups',
					'rest 60 seconds',
					'do 18 pushups',
					'rest 60 seconds',
					'do 12 pushups',
					'rest 60 seconds',
					'do 12 pushups',
					'rest 60 seconds',
					'do at least 18 pushups',
					'done!',
				],
			},
		],

		situps: [
			{
				name: 'w3t1d1',
				steps: [
					'do 15 situps',
					'rest 60 seconds',
					'do 18 situps',
					'rest 60 seconds',
					'do 11 situps',
					'rest 60 seconds',
					'do 11 situps',
					'rest 60 seconds',
					'do at least 14 situps',
					'done!',
				],
			},
			{
				name: 'w3t1d2',
				steps: [
					'do 15 situps',
					'rest 60 seconds',
					'do 18 situps',
					'rest 60 seconds',
					'do 12 situps',
					'rest 60 seconds',
					'do 12 situps',
					'rest 60 seconds',
					'do at least 18 situps',
					'done!',
				],
			},
		],
	};

	return (
		<div className='flex mx-auto backdrop-blur-lg bg-black/30 h-screen w-screen'>
			<Provider store={store}>
			<ExerciseComponent programs={programs} />
			<Canvas>
				<MascotModel />
			</Canvas>
			</Provider>
		</div>
	);
}

export default Index;
