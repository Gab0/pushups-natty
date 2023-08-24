// database.ts
//
import exerciseDatabase from "../../pages/api/routines.json";

interface ProgramSeed {
	name: string;
	steps: number[];
}

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
