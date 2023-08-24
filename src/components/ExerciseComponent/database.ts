// database.ts

interface ProgramSeed {
	name: string;
	steps: number[];
}

const exercisePrograms = {
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

const programSeeds: ProgramSeed[] = [
	{
		name: 'w1t3d1',
		steps: [10, 12, 7, 7, 9],
	},
	{
		name: 'w1t3d2',
		steps: [10, 12, 8, 8, 12],
	},
	{
		name: 'w1t3d3',
		steps: [11, 15, 9, 9, 13],
	},
	// ... Outros dados aqui
];

const extraExercises: string[] = ['Prancha', 'Prancha Lado esquerdo', 'Prancha Lado direito'];

interface ParsedProgram {
	name: string;
	steps: string[];
}

const parseProgram = (programSeed: ProgramSeed): ParsedProgram => {
	const content: string[] = [];
	let last: number | boolean = 0;
	let message = '';

	for (let a = 0; a < programSeed.steps.length; a++) {
		last = a === programSeed.steps.length - 1;

		if (last) {
			message = 'do at least ';
		} else {
			message = 'do ';
		}

		content.push(message + programSeed.steps[a] + ' pushups');

		if (!last) {
			content.push('rest 60 seconds');
		}
	}

	content.push('done!');

	return {
		name: programSeed.name,
		steps: content,
	};
};

export const pushupContent: ParsedProgram[] = programSeeds.map(parseProgram);
