import { readFileSync } from 'fs';
import { resolve } from 'path';

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d4/input.txt'), 'utf8').trim().split('\n');

let count = 0;
for (const line of lines) {
  let [, r1Min, r1Max, r2Min, r2Max] = /^([\d]+)-([\d]+),([\d]+)-([\d]+)$/.exec(line);
  r1Min = parseInt(r1Min);
  r2Min = parseInt(r2Min);
  r1Max = parseInt(r1Max);
  r2Max = parseInt(r2Max);

  if (
    (r1Min >= r2Min && r1Max <= r2Max)
    || (r2Min >= r1Min && r2Max <= r1Max)
  ) {
    count += 1;
  }
}

console.log(count);
