import { readFileSync } from 'fs';
import { resolve } from 'path';

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d1/p2/input.txt'), 'utf8').trim();

const topThree = [0, 0, 0];

function wrangleTopThree(value: number) {
  if (value > topThree[0]!) {
    topThree[0] = value;
  }

  topThree.sort((a, b) => a - b);
}

let currentTotal = 0;
for (const line of lines.split('\n')) {
  if (line !== '') {
    currentTotal += parseInt(line);

    continue;
  }

  wrangleTopThree(currentTotal);
  currentTotal = 0;
}

console.log(topThree.reduce((a, b) => a + b));
