// database.ts
//
// Load the database and process its data so it can be used
// by all the other modules;
import exerciseDatabase from "../../pages/api/routines.json";

interface ProgramSeed {
	name: string;
	steps?: string[];
	type: string;
	twd?: number[][][][];
}

interface ExerciseDay {
	name: string;
	steps: string[];
}

interface ExerciseProgram {
	name: string;
	days: ExerciseDay[];
}

const parseTWD = (value_array: number[][][][]): ExerciseDay[] => {

	let programs = [];
	for (let t = 0; t < value_array.length; t++) {
		for (let w = 0; w < value_array[t].length; w++) {
			for (let d = 0; d < value_array[t][w].length; d++) {
				programs.push({
					name: `Tier ${t + 1} Week ${w + 1} Day ${d + 1}`,
					steps: parseProgramNumbers(value_array[t][w][d])
				})
			}
		}
	}

	return programs;
}


const parseProgramNumbers = (repetitionSeries: number[]): string[] => {

	const content: string[] = [];
	let last: number | boolean = 0;
	let message = '';

	for (let a = 0; a < repetitionSeries.length; a++) {
		last = a === repetitionSeries.length - 1;

		if (last) {
			message = 'do at least ';
		} else {
			message = 'do ';
		}

		content.push(message + repetitionSeries[a] + ' pushups');

		if (!last) {
			content.push('rest 60 seconds');
		}
	}

	content.push('done!');

	return content;

}

const parseProgram = (programSeed: ProgramSeed): ExerciseProgram => {

	let steps: ExerciseDay[] = [];

	if (programSeed.twd !== undefined) {
		steps = parseTWD(programSeed.twd);
	}

	if (programSeed.steps !== undefined) {
		steps = [{name: "Singleton", steps: programSeed.steps}];
	}

	return {
		name: programSeed.name,
		days: steps,
	};
};

export const pushupContent: ExerciseProgram[] = exerciseDatabase.map(parseProgram);
