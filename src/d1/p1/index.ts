import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';

const lines = readFileSync(resolve(dirname(__filename), 'input.txt'), 'utf8').trim();

let max = 0;
let currentTotal = 0;
for (const line of lines.split('\n')) {
  if (line !== '') {
    currentTotal += parseInt(line);

    continue;
  }

  if (currentTotal > max) {
    max = currentTotal;
  }

  currentTotal = 0;
}

console.log(max);
