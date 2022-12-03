import { readFileSync } from 'fs';
import { resolve } from 'path';

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d1/p1/input.txt'), 'utf8').trim();

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
