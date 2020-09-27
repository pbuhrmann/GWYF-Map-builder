import { Basic, WallH, WallV } from '../domain';

export const generateFromDisplay = (display: string) => {

	const result: Basic[] = [];

	const lines = display.split('\r\n');

	let x = 0;
	let y = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		x = 0;

		for (let j = 0; j < line.length - 1; j = j + 4) {
			if (i % 2 == 0) {
				const sub = line.substr(j, 5);

				if (sub == '+---+') {
					const wall = new WallH(x, y + 3);
					result.push(wall);
				}
			}
			else {
				const sub = line.substr(j, 5);

				if (sub == '|###|') {
					const wall1 = new WallV(x - 3, y + 3);
					const wall2 = new WallV(x + 3, y + 3);
					result.push(wall1, wall2);
				}
				else if (sub == '|####') {
					const wall = new WallV(x - 3, y + 3);
					result.push(wall);
				}
				else if (sub == '####|') {
					const wall = new WallV(x + 3, y + 3);
					result.push(wall);
				}
			}
			x += 6;
		}
		y += 3;
	}

	return result.join(',');
}